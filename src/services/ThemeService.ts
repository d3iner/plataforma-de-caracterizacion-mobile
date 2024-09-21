import {Appearance, ColorSchemeName} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants  from '../constants/Constants';


const themeKey = Constants.STORAGE_THEME

export async function changeTheme(theme?: 'dark' | 'light'){
    if (theme){
        try {
            await AsyncStorage.setItem(
            themeKey,
            theme
            );
        } catch (error) {
            console.log('Error saving theme to storage', error);
        }
    }else{
        try {
            await AsyncStorage.removeItem(themeKey)
        } catch (error) {
            console.log('Error deleting theme to storage', error);
        }
    }
    Appearance.setColorScheme(theme)
}

export async function getTheme(): Promise<ColorSchemeName>{
    try {
        const mode = await AsyncStorage.getItem(themeKey);
        return mode as ColorSchemeName;
    } catch (error) {
        console.log('Error loading theme from storage', error);
        return undefined;
    }
}

export async function getThemePromise() {
    return AsyncStorage.getItem(themeKey);
}