import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

interface ThemedTextInputProps extends TextInputProps {
    lightColor?: string;
    darkColor?: string;
    error?: string;
}

const ThemedTextInput = ({
    style,
    lightColor,
    darkColor,
    error,
    ...rest
}: ThemedTextInputProps) => {
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'borderColor');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <View style={styles.inputContainer}>
            <TextInput style={[styles.default, { borderColor, color }, style]} {...rest} />
            {error && error?.length ? (
                <ThemedText lightColor='red' darkColor='red'>
                    {error}
                </ThemedText>
            ) : undefined}
        </View>
    );
    return;
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
    inputContainer: { width: '100%' },
});
