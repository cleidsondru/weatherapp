import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedButton from '@/components/ThemedButton';
import { object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseScreen from '@/components/BaseScreen';
import { LoginRequest } from '@/types/weather';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login } from '@/store/weatherSlice';
import { router } from 'expo-router';

const LoginSchema = object().shape({
    email: string().required('Email is required').email('Invalid Email'),
    password: string()
        .required('Password is required')
        .min(8, 'Pasword must contain at least 8 characters'),
});

const AuthScreen = () => {
    const dispatch = useAppDispatch();
    const isLoggingIn = useAppSelector((state) => state.weather.isLoggingIn);
    const userEmail = useAppSelector((state) => state.weather.userEmail);
    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    React.useEffect(() => {
        if (!isLoggingIn && userEmail.length) {
            router.replace('/(tabs)');
        }
    }, [isLoggingIn, userEmail]);

    const onPressLogin = ({ email, password }: LoginRequest) => {
        dispatch(login({ email, password }));
        // reset();
    };

    return (
        <BaseScreen>
            <ThemedText type='title'>WeatherApp</ThemedText>
            <View style={styles.formContainer}>
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
            {!isLoggingIn ? (
                <ThemedButton title='Login' onPress={handleSubmit(onPressLogin)} />
            ) : (
                <ActivityIndicator size='large' />
            )}
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
    formContainer: {
        width: '100%',
        gap: 30,
    },
});
