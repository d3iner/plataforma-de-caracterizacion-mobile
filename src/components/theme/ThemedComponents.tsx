import React from "react";
import { useIsDark } from "../../context/ContextProvider";
import { Colors } from "../../theme/Colors";
import { TextProps, Text, ViewProps, View, SafeAreaView, TextInput, TextInputProps } from "react-native";
// import Checkbox, { CheckboxProps } from "expo-checkbox";
import Animated, { AnimatedProps } from "react-native-reanimated";


interface inverted {
    /**
     * If true it will invert the current theme scheme for this component and will use it`s respect theme color
     */
    inverted?: boolean
}

//REACT-NATIVE COMPONENTS
export function ThemedText({inverted, ...props}:TextProps & inverted){
    return <Text {...props} style={[ props.style, {color: colorSchema(inverted).text}]}/>
}

export function AnimatedThemedText({inverted, ...props}:AnimatedProps<TextProps> & inverted){
    return <Animated.Text {...props} style={[ props.style, {color: colorSchema(inverted).text}]}/>
}

export function ThemedView({inverted, ...props}:ViewProps & inverted){
    return <View {...props} style={[ props.style, {backgroundColor: colorSchema(inverted).background}]}/>
}

export function AnimatedThemedView({inverted, ...props}:AnimatedProps<ViewProps> & inverted){
    return <Animated.View {...props} style={[ props.style, {backgroundColor: colorSchema(inverted).background}]}/>
}

export function ThemedSafeAreaView({inverted, ...props}:ViewProps & inverted){
    return <SafeAreaView {...props} style={[ props.style, {backgroundColor: colorSchema(inverted).background}]}/>
}

export function ThemedTextInput({inverted, innerRef, ...props}:TextInputProps & 
    inverted & {innerRef?: React.MutableRefObject<TextInput>}){
    return <TextInput ref={innerRef} {...props} style={[ props.style, {color: colorSchema(inverted).text}]} 
    placeholderTextColor={colorSchema(!inverted).icon}/>
}

//THIRD PARTY COMPONENTS 

/* export function ThemedCheckBok({inverted, ...props}: CheckboxProps & inverted){
    return <Checkbox {...props} style={[props.style, {borderColor: colorSchema(inverted).border}]} color={Colors.palette.secondary}/>
}  */

//SCHEMAS

/**
 * This function returns the color schema based on the inverted flag and the current theme mode.
 *
 * @param inverted - A boolean flag indicating whether to use the inverted color schema.
 * If true it will return the inverted color schema, otherwise it will return the real color schema.
 * Default value is false
 * @returns An object containing the text, background and many other colors based on the inverted flag and the current theme mode.
 *
 * 
 * 
 * @example
 * ```typescript
 * const schema = colorSchema();
 * console.log(schema.text); // Output: "#11181C" (black color)
 * console.log(schema.background); // Output: "#FFFFFF" (white color)
 * 
 * const realSchema = colorSchema(false);
 * console.log(realSchema.text); // Output: "#11181C" (black color)
 * console.log(realSchema.background); // Output: "#FFFFFF" (white color)
 * 
 * const invertedSchema = colorSchema();
 * console.log(invertedSchema.text); // Output: "#ECEDEE" (white color)
 * console.log(invertedSchema.background); // Output: "#151718" (black color)
 *
 * ```
 */
export function colorSchema(inverted = false){
    return inverted ? colorSchemaInversed() : colorSchemaReal()
}

function colorSchemaReal(){
    return useIsDark() ? Colors.dark : Colors.light
}

function colorSchemaInversed(){
    return !useIsDark() ? Colors.dark : Colors.light
}