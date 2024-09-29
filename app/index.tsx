import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedButton from '@/components/ThemedButton';
import { object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginSchema = object().shape({
    email: string().required('Email is required').email('Invalid Email'),
    password: string()
        .required('Password is required')
        .min(8, 'Pasword must contain at least 8 characters'),
});

const AuthScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onPressLogin = (data: any) => console.log('login', data);

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.select({ ios: 'padding' })}
        >
            <ThemedView style={styles.main}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    <ThemedText type='title'>WeatherApp</ThemedText>
                    <View style={styles.fullWidth}>
                        <View style={styles.inputMarging}>
                            <Controller
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <ThemedTextInput
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        placeholder='Username'
                                    />
                                )}
                                name='email'
                            />
                            {errors.email?.message ? (
                                <ThemedText type='default' lightColor='red' darkColor='red'>
                                    {errors.email.message}
                                </ThemedText>
                            ) : undefined}
                        </View>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <ThemedTextInput
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    placeholder='Password'
                                />
                            )}
                            name='password'
                        />
                        {errors.password?.message ? (
                            <ThemedText type='default' lightColor='red' darkColor='red'>
                                {errors.password.message}
                            </ThemedText>
                        ) : undefined}
                    </View>
                    <ThemedButton title='Login' onPress={handleSubmit(onPressLogin)} />
                </ScrollView>
            </ThemedView>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;

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
    },
    inputMarging: { marginBottom: 30 },
    fullWidth: { width: '100%' },
});
