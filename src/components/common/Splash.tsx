import React from 'react'
import { StyleSheet, ImageSourcePropType, useWindowDimensions, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Colors } from '@/src/theme/Colors';

export interface SplashProps{
    source?: ImageSourcePropType
}

export default function Splash({source}:SplashProps) {

    const { width } = useWindowDimensions()

    const circleDimension = width * .25

    const animation = useAnimatedStyle(()=>(
        {
            // transform: [{scale: withRepeat(withSpring(0.2), -1, true)}]
            transform: [{scale: withSequence(
                withTiming(0, {duration: 0}),
                withTiming(1, {duration: 1500}),
                withRepeat(withTiming(0.25, {duration: 1000}), -1, true))}]
        }
    ))

    return (
        <View style={styles.splashContainer}>
            <Animated.View 
                style={[
                    {width: circleDimension, borderRadius: circleDimension},
                    styles.circle, animation]}>
                <LinearGradient
                    colors={[Colors.palette.secondary, Colors.palette.primary]}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    splashContainer:{
        position: 'absolute',
        zIndex: 1000,
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    circle: {
        aspectRatio: 1,
        overflow: 'hidden',
    }
})
