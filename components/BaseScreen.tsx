import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ViewProps } from 'react-native';
import { ThemedView } from './ThemedView';

const BaseScreen = ({ children, style }: ViewProps) => {
    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.select({ ios: 'padding' })}
        >
            <ThemedView style={styles.main}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[styles.scrollViewContainer, style]}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </ThemedView>
        </KeyboardAvoidingView>
    );
};

export default BaseScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 20,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: { width: '100%' },
    scrollViewContainer: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 50,
    },
});
