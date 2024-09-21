import React from 'react'
import { ThemedSafeAreaView, ThemedText } from '../components/theme/ThemedComponents'
import { Image, useWindowDimensions, StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Colors';
import MainButton from '../components/common/MainButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

interface HomeProps{
    navigation: StackNavigationProp<ParamListBase>
}

export default function Home({navigation}: HomeProps) {

    return (
        <ThemedSafeAreaView style={styles.container}>
            <Background/>
            <View style={styles.contentContainer}>
                <LinearGradient 
                colors={['#fff9', 'transparent']}
                start={{x: 1, y: 0}}
                end={{x: 0.1, y: 0.9}}
                style={[styles.backgroundLinearGradient]}
                />
                <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 30, paddingVertical: 50, width: '100%'}}>
                    <Text style={[styles.title]}>CENSU</Text>
                    <Image source={require('@assets/qr.png')} style={styles.qrImage}/>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Text style={styles.smallText}>Por favor escanear tu documento</Text>
                        <MainButton text='Escanear'onPress={(()=>navigation.navigate('Scanner'))}/>
                    </View>
                </View>
            </View>
        </ThemedSafeAreaView>
    )
}

function Background(){
    const { width, height } = useWindowDimensions()

    const breakPoint = width / height

    return(
        <>
            <Image source={require('@assets/beach.png')} style={[{width, height: width * 1.1}, styles.backgroundImage]}/>
            <LinearGradient 
            colors={['transparent', Colors.palette.primary]}
            style={[styles.backgroundLinearGradient]}
            end={{
                x: breakPoint,
                y: breakPoint,
            }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage:{
        position: 'absolute',
        top: 0,
        objectFit: 'cover',
        backgroundColor: 'red'
    },
    backgroundLinearGradient: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%'
    },
    contentContainer:{
        position: 'relative',
        width: '85%', 
        height: '55%', 
        backgroundColor: '#fff6',
        overflow: 'hidden',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.light.text
    },
    smallText:{
        fontSize: 14,
        color: Colors.light.icon,
        fontWeight: 'bold',
    },
    qrImage:{
        height: '50%',
        aspectRatio: 1 / 1,
        resizeMode: 'contain'
    }
})
