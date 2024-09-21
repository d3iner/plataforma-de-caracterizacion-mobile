import React, { useEffect, useRef, useState } from 'react'
import { ColorValue, GestureResponderEvent, Image, ImageSourcePropType, StyleProp, StyleSheet, Text, Touchable, TouchableOpacity, useAnimatedValue, useWindowDimensions, View, ViewStyle } from 'react-native'
import Animated, { AnimatedStyle, FadeIn, FadeInUp, FadeOut, FadeOutDown, interpolate, LinearTransition, SlideInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { colorSchema, ThemedText } from '../theme/ThemedComponents'
import MainButton from './MainButton'
import { Colors } from '@/src/theme/Colors'
import { VehiclePeople } from '@/src/interfaces/interfaces'
import { FlatList } from 'react-native-gesture-handler'
import AntDesign from '@expo/vector-icons/AntDesign';

interface QrScanInfoProps{
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>,
    onPressFinish?: ((event: GestureResponderEvent) => void),
    vehicle?: VehiclePeople
}

export default function QrScanInfo({style, onPressFinish, vehicle}: QrScanInfoProps) {

    const people = vehicle?.personas

    const vehicleItem = vehicle?.vehiculo

    const peopleListRef = useRef<FlatList>(null)

    const {width} = useWindowDimensions()

    const sectionWidth = width * 0.9

    const schema = colorSchema()

    const [peopleListPage, setPeopleListPage] = useState<number>(0)

    return (
        <Animated.View entering={FadeInUp} exiting={FadeOutDown} style={[
            styles.container, 
            {backgroundColor: schema.background, width: sectionWidth},
            style
            ]}>
            <Image source={require('@assets/icons/others/colored/degraded-identification.png')}
            style={styles.cardImage}
            />
            <View style={{marginTop: 30, width: '100%'}}>
                <Section color={Colors.palette.primary} 
                title='Datos del propietario' 
                iconSource={require('@assets/icons/others/profile.png')}>
                    <FlatList 
                        ref={peopleListRef}
                        data={people}
                        horizontal
                        onViewableItemsChanged={({viewableItems})=>{
                            setPeopleListPage(viewableItems[0].index ?? peopleListPage)
                        }}
                        pagingEnabled
                        contentContainerStyle={{
                            paddingVertical: 10
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index})=>(
                            <View key={index} style={{ paddingHorizontal: 20, gap: 10, width: sectionWidth}}>
                                <Lable title='Nombre del poseedor' value={item.nombre}/>
                                <Lable title='Tipo de documento' value={item.tipoDocumento}/>
                                <Lable title='Nombre del propietario' value={people?.find(person => person.tipoPersona === 'Propietario')?.nombre}/>
                                <Lable title='Licencia de tránsito No.' value={item.numLicencia}/>
                            </View>
                        )}
                        />
                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
                            <TouchableOpacity 
                            onPress={()=>{
                                const previewPage = peopleListPage - 1 < 0 ? peopleListPage : peopleListPage - 1
                                peopleListRef.current?.scrollToIndex({index: previewPage})
                            }}
                            >
                                <AntDesign name="arrowleft" size={24} color={schema.icon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                const nextPage = people && peopleListPage + 1 >= people?.length ? peopleListPage : peopleListPage + 1 
                                peopleListRef.current?.scrollToIndex({index: nextPage})
                            }}>
                                <AntDesign name="arrowright" size={24} color={schema.icon} />
                            </TouchableOpacity>
                        </View>
                </Section>
                <Section color={Colors.palette.secondary} 
                title='Datos del vehiculo' 
                iconSource={require('@assets/icons/others/car.png')} containerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 10
                    }}>
                    <View style={[styles.row]}>
                        <View style={{width: '40%'}}>
                            <Lable title='Placa' value={vehicleItem?.placa}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Lable title='Nro. motor' value={vehicleItem?.numMotor}/>
                        </View>
                    </View>
                    <View style={[styles.row]}>
                        <View style={{width: '40%'}}>
                            <Lable title='Clase' value={vehicleItem?.clase}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Lable title='Nro chasis' value={vehicleItem?.chasis}/>
                        </View>
                    </View>
                    <View style={[styles.row]}>
                        <View style={{width: '40%'}}>
                            <Lable title='Marca' value={vehicleItem?.marca}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Lable title='Nro. serie' value={vehicleItem?.serie}/>
                        </View>
                    </View>
                    <View style={[styles.row]}>
                        <View style={{width: '40%'}}>
                            <Lable title='Servicio' value={vehicleItem?.servicio}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Lable title='Color' value={vehicleItem?.color}/>
                        </View>
                    </View>
                </Section>
            </View>
            <View style={{width: '100%', paddingHorizontal: 50}}>
                <MainButton text='Terminar' onPress={onPressFinish}/>
            </View>
        </Animated.View>
    )
}

interface LableProps{
    title?: string;
    value?: string,
}

function Lable({title, value}: LableProps){

    const schema = colorSchema()

    return(
        <View style={{width: '100%', alignItems: 'flex-start', flexDirection: 'column'}}>
            <Text style={[styles.lableTitle, {color: schema.icon}]}>{title}</Text>
            <Text style={[styles.lableText, {color: schema.icon}]}>{value}</Text>
        </View>
    )
}

interface SectionProps{
    color?: ColorValue,
    iconSource?: ImageSourcePropType, 
    title?: string,
    containerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
    children: React.ReactNode

}

function Section({color, iconSource, title, containerStyle, children}: SectionProps){

    const [open, setOpen] = useState<boolean>(false)

    const openValue = useSharedValue(0)

    useEffect(()=>{
        openValue.value = withTiming(open? 1 : 0, {duration: 200})
    }, [open])

    const arrowAnimatedValue = useAnimatedStyle(()=>(
        {
            transform: [{rotateZ: `${interpolate(openValue.value, [0, 1], [0, 90])}deg`}]
        }
    ))

    return(
        <>
        <TouchableOpacity activeOpacity={0.9} style={[{backgroundColor: color}, styles.sectionHeader]} onPress={()=>setOpen(!open)}>
            <View style={{gap: 10, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={iconSource} style={[styles.sectionIcon]}/>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            <Animated.Image 
            source={require('@assets/icons/arrows/right-arrow.png')} 
            style={[styles.sectionIcon, {width: 15, height: 15}, arrowAnimatedValue]}/>
        </TouchableOpacity>
        {open && (
            <Animated.View style={[{width: '100%'}, containerStyle]} 
            entering={FadeIn} >
                {children}
            </Animated.View>
        )}
        </>
    )   
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 30,
    },
    cardImage:{
        width: 120,
        height: 70,
        resizeMode: 'contain'
    },
    sectionHeader:{
        width: '100%', 
        paddingVertical: 10, 
        position: 'relative', 
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sectionIcon:{
        tintColor: Colors.dark.text,
        height: 30,
        width: 30,
    },
    sectionTitle:{
        color: Colors.dark.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    lableTitle:{
        fontSize: 14,
    },
    lableText:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
    }
})