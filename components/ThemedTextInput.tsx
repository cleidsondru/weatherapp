import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
};

const ThemedTextInput = ({ style, lightColor, darkColor, ...rest }: ThemedTextInputProps) => {
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return <TextInput style={[styles.default, { borderColor, color }, style]} {...rest} />;
};

export default ThemedTextInput;

const styles = StyleSheet.create({
    default: {
        width: '100%',
        borderWidth: 1,
        height: 40,
        borderRadius: 5,
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 5,
    },
});
