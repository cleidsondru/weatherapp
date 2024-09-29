import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { ThemedText } from './ThemedText';

type ThemedButtonProps = TouchableOpacityProps & { title: string };

const ThemedButton = ({ title, ...rest }: ThemedButtonProps) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#256EFF',
                padding: 10,
                borderRadius: 5,
                width: '100%',
                alignItems: 'center',
            }}
            {...rest}
        >
            <ThemedText type='subtitle' darkColor='white' lightColor='white'>
                {title}
            </ThemedText>
        </TouchableOpacity>
    );
};

export default ThemedButton;

const styles = StyleSheet.create({});
