import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions, TransitionSpecs } from '@react-navigation/stack'

//Screen
import Home from '../../screens/Home';
import Scanner from '@/src/screens/Scanner';

const Stack = createStackNavigator();

export default function StackNavigator() {

    //Default
    const stackOptions:StackNavigationOptions  = {
        headerShown: false,
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        gestureEnabled: true,
        transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyle: {
            backgroundColor: 'white',
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }

    //Headers
/*     const backHeader:StackNavigationOptions = {
        headerShown: true,
        header: BackHeader,
    } */

/*     const backHeaderWithLogo:StackNavigationOptions = {
        headerShown: true,
        header: (props) => <BackHeader {...props} showLogo/>,
    } */

    //Interpolators 
    const fadeInterpolation:StackNavigationOptions = {
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
    }

    //Modals
    const modalOptions:StackNavigationOptions  ={
        cardStyle: {
            backgroundColor: '#fff0',
        },
        presentation: 'transparentModal',
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={stackOptions}>
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='Scanner' component={Scanner} options={fadeInterpolation}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
