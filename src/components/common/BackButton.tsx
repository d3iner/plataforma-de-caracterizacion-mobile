import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text, StyleProp, ViewStyle, GestureResponderEvent } from "react-native";
import { colorSchema } from "../theme/ThemedComponents";
import { AntDesign, Feather } from '@expo/vector-icons';

export interface BackButtonProps {
    style?: StyleProp<ViewStyle>
    onPress?: (event: GestureResponderEvent) => void
}

export default function BackButton({ style, onPress }:BackButtonProps) {
    const schema = colorSchema()
    const schemaInversed = colorSchema(true)
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>() 

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: schemaInversed.icon}, style]} onPress={ onPress ? onPress : () => navigation.goBack()}>
            <Feather name="chevron-left" size={28} color={schemaInversed.text} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: '#ffff',
        marginLeft: 20,
        marginTop: 60,
        borderStyle: 'solid',
        opacity: 0.5
    }
})