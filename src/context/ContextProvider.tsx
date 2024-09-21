import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native'
import { getTheme } from '../services/ThemeService'
import Splash from '../components/common/Splash'
import { StatusBar } from 'expo-status-bar';


const IsDarkContext = createContext<boolean | undefined>(undefined)

/**
 * Custom React hook that returns whether the current color scheme is dark.
 * It uses the `useContext` hook to access the `IsDarkContext` context.
 *
 * @returns {boolean} - Returns `true` if the current color scheme is dark, `false` otherwise.
 *
 * @example
 * ```typescriptreact
 * import React from 'react';
 * import { View, Text } from 'react-native';
 * import { useIsDark } from './ContextProvider';
 *
 * const MyComponent = () => {
 *   const isDarkMode = useIsDark();
 *
 *   return (
 *     <View>
 *       <Text>{isDarkMode? 'Dark Mode' : 'Light Mode'}</Text>
 *     </View>
 *   );
 * };
 * ```
 */
export function useIsDark(): boolean | undefined {
    const context = useContext(IsDarkContext)
    
    // return context

    //Temporal return
    return false
}


export default function ContextProvider({children}: {children: any}) {

    const [themeType, setThemeType] = useState<ColorSchemeName>(null)

    const [prefetchData, setPrefetchData] = useState()
    const [loadingPrefetchData, setLoadingPrefetchData] = useState<boolean>(true)

    useEffect(()=>{
        prefetch()
    }, [])

    useEffect(()=>{
        setThemeString()
    }, [])

    useEffect(()=>{
        Appearance.setColorScheme(themeType)
    }, [themeType])

    async function setThemeString(){
        setThemeType(await getTheme())
    }

    const prefetch = useCallback(()=>{
        setLoadingPrefetchData(true)
        setTimeout(()=>{
            setLoadingPrefetchData(false)
        }, 5000)
    }, [])

    return (
        <IsDarkContext.Provider value={ useColorScheme() === 'dark' }>
            {children}
            {loadingPrefetchData && (
                <Splash/>
            )}
            <StatusBar style="auto" />
        </IsDarkContext.Provider>
    )
}
