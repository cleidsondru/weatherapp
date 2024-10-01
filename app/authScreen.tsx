import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedButton from '@/components/ThemedButton';
import { object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseScreen from '@/components/BaseScreen';

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
        <BaseScreen>
            <ThemedText type='title'>WeatherApp</ThemedText>
            <View style={styles.fullWidth}>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
                        <ThemedTextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder='Email'
                            error={errors.email?.message}
                        />
                    )}
                    name='email'
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
                        <ThemedTextInput
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder='Password'
                            secureTextEntry
                            error={errors.password?.message}
                        />
                    )}
                    name='password'
                />
            </View>
            <ThemedButton title='Login' onPress={handleSubmit(onPressLogin)} />
        </BaseScreen>
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
