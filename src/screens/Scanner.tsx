import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, Text, useWindowDimensions, Image, Alert, AlertButton, ActivityIndicator } from 'react-native'
import { Camera, CameraType } from 'expo-camera/legacy';
import MainButton from '../components/common/MainButton';
import { BarcodeScanningResult } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { VehiclePeople } from '../interfaces/interfaces';
import vehicleService from '../services/VehicleService';
import { AxiosResponse } from 'axios';
import { Colors } from '../theme/Colors';
import Animated, { FadeIn } from 'react-native-reanimated';
import QrScanInfo from '../components/common/QrScanInfo';
import BackButton from '../components/common/BackButton';

export default function Scanner() {

    const [data, setData] = useState<VehiclePeople | undefined>(undefined)
    const [readingCode, setReadingCode] = useState<boolean>(false)
    const [alertShown, setAlertShown] = useState<boolean>(false)

    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission()
        }
    }, [])

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <Animated.View style={styles.container} entering={FadeIn}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <MainButton onPress={requestPermission} text="grant permission" />
            </Animated.View>
        );
    }

    const onBarCodeScanned: ((scanningResult: BarcodeScanningResult) => void) = (res)=>{
        if (!alertShown && !readingCode && !data) {
            setReadingCode(true)
            vehicleService.getByQrCode(res.data).then((vehicle)=>{
                setData(vehicle)
            }).catch((res: AxiosResponse)=>{
                setAlertShown(true)
                const buttons: AlertButton[] = [{text: 'OK', onPress: ()=>setAlertShown(false)}]
                if (res.status === 404) {
                    Alert.alert('No encontrado', 'No se ha encontrado ningun vehiculo relacionado a esta busqueda', buttons)
                }
                Alert.alert('Error', 'Error de busqueda', buttons)
            }).finally(()=>setReadingCode(false))
        }
    }


    return (
        <View style={styles.container}>
            {/* Aqui va el componente de scanner */}
            {/* <ScannerComponent /> */}
            <Camera style={[StyleSheet.absoluteFillObject]} type={CameraType.back}
            barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}            
            onBarCodeScanned={onBarCodeScanned}
            >
                <ScannerCover/>
                {readingCode && (
                    <View style={{position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={[styles.loadingCover]}>
                            <ActivityIndicator size={'large'} color={Colors.palette.primary}/>
                        </View>
                    </View>
                )}
            </Camera>
            {data && (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <QrScanInfo onPressFinish={()=>setData(undefined)} vehicle={data}/>
                </View>
            )}
            
            <BackButton/>
        </View>
    )
}

function ScannerCover(){

    const {width, height} = useWindowDimensions()

    return(
        <>
        {/* Semi-transparent Overlay */}
        {/* Top overlay */}
        <View style={styles.overlayTop} />
        {/* Middle row with left overlay, transparent square, and right overlay */}
        <View style={styles.row}>
        {/* <Image source={require('@assets/others/qr/corners/top-left.png')}
            style={[styles.scannerCorner, {left: width * 0.1, top: -10}]}/> */}
            <View style={styles.overlaySide} />
            <View style={[styles.transparentSquare, {width: width * 0.8, height: height * 0.5}]} />
            <View style={styles.overlaySide} />
        </View>

        {/* Bottom overlay */}
        <View style={styles.overlayBottom} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row', // Creates a horizontal layout for left, transparent square, and right
    },
    overlayTop: {
        flex: 1,             // Takes the top half of the screen
        backgroundColor: '#000a',
    },
    overlayBottom: {
        flex: 1,             // Takes the bottom half of the screen
        backgroundColor: '#000a',
    },
    overlaySide: {
        flex: 1,             // Fills the space on the left and right of the transparent square
        backgroundColor: '#000a',
    },
    transparentSquare: {
        backgroundColor: 'transparent',  // Fully transparent
        // borderRadius: 10,
        borderColor: '#000a',  // Optional border around the transparent square
        // borderWidth: 15,
    },
    scannerCorner:{
        position: 'absolute',
        width: 70, 
        height: 150,
        objectFit: 'contain',
    },
    loadingCover:{
        position: 'absolute',
        backgroundColor: Colors.light.background,
        alignSelf: 'center',
        paddingVertical: 50,
        paddingHorizontal: 150, 
        alignItems: 'center',
        justifyContent: 'center',
    }
})

