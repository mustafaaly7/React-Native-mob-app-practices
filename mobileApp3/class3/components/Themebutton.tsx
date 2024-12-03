

import { TouchableOpacity, type TouchableOpacityProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

export type ThemedbuttonProps = TouchableOpacityProps & {
    bgColor?: string;
    txt?: string;
    txtColor?: string

};

export function ThemedButton({
    style,
    bgColor,
    txt,
    txtColor,
    ...rest
}: ThemedbuttonProps) {

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: bgColor ? bgColor : "black" }]} {...rest} >
            <ThemedText style={{ color: txtColor ? txtColor : "White" }}>{txt ? txt : "Button"}</ThemedText>


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,
        // marginHorizontal: 10,
        borderRadius: 9

    }
});
