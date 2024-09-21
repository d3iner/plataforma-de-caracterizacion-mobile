import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps, StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import Animated, { AnimatedStyle, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Colors } from '../../theme/Colors'

interface MainButtonProps extends TouchableOpacityProps{
    innerRef?: React.LegacyRef<TouchableOpacity>,
    secondary?: boolean,
    text?: string
    containerStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
    loading?: boolean
}

export default function MainButton({innerRef,text, secondary, containerStyle, loading, ...props}: MainButtonProps) {

    const disabledValue = useSharedValue<number>(props.disabled ? 0.7 : 1)

    const [rendered, setRendered] = useState<boolean>(false)
    const [disable, setDisable] = useState<boolean | undefined>(undefined)

    useEffect(()=>{
        setRendered(true)
    }, [])

    useEffect(()=>{
        const newDisabled = loading || props.disabled
        setDisable(newDisabled)
    }, [loading, props.disabled])

    useEffect(()=>{
        disabledValue.value = withTiming(disable ? 0.6 : 1, {
            duration: rendered? 200 : 0,
        })
    }, [disable])

    const animatedStyle = useAnimatedStyle(()=>{

        return {
            opacity: disabledValue.value
        }
    })

    return (
        <Animated.View style={[{width: '100%'}, animatedStyle, containerStyle]}>
            <TouchableOpacity ref={innerRef} {...props} disabled={disable} style={[styles.button, props.style, secondary && styles.buttonSecondary]}>
                {loading ? (
                    <ActivityIndicator size={'large'} color={'white'}/>
                ) : (
                    <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{text}</Text>
                )}
            </TouchableOpacity>
        </Animated.View>
    )
}

const buttonHeight = 50 

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.palette.primary,
        height: buttonHeight,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: Colors.palette.primary,
    }, 
    buttonSecondary:{
        backgroundColor: 'white'
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
    },
    buttonTextSecondary:{
        color: Colors.palette.primary,
    }
})
