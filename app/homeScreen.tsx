import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import BaseScreen from '@/components/BaseScreen';
import { Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedButton from '@/components/ThemedButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteWeather, fetchWeather } from '@/store/weatherSlice';
import { LocationRequest } from '@/types/weather';
import WeatherCard from '@/components/WeatherCard';
import { ThemedText } from '@/components/ThemedText';

const locationSchema = object({
    city: string().required('A city name is required'),
    countryCode: string().required('A country code is required'),
});

const HomeScreen = () => {
    const weatherMap = useAppSelector((state) => state.weather.weatherMap);
    const isLoadingWeather = useAppSelector((state) => state.weather.isLoadingWeather);
    const weatherMapKeys = Object.keys(weatherMap);
    const dispatch = useAppDispatch();
    const onSubmit = (values: LocationRequest, { resetForm }: FormikHelpers<LocationRequest>) => {
        dispatch(fetchWeather(values));
        resetForm();
    };
    console.log(JSON.stringify(weatherMap));

    return (
        <BaseScreen style={styles.main}>
            {weatherMapKeys.length < 3 ? (
                <Formik
                    initialValues={{ city: '', countryCode: '' }}
                    validationSchema={locationSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, errors, handleChange, handleSubmit }) => (
                        <View style={{ width: '100%', gap: 20 }}>
                            <ThemedText type='subtitle' style={{ textAlign: 'center' }}>
                                You can include
                                {3 - weatherMapKeys.length === 1
                                    ? ` 1 more location`
                                    : ` ${3 - weatherMapKeys.length} locations`}
                            </ThemedText>
                            <ThemedTextInput
                                onChangeText={handleChange('city')}
                                value={values.city}
                                placeholder='City name'
                                error={errors.city}
                                editable={!isLoadingWeather}
                            />
                            <ThemedTextInput
                                onChangeText={handleChange('countryCode')}
                                value={values.countryCode}
                                placeholder='Country code'
                                error={errors.countryCode}
                                editable={!isLoadingWeather}
                            />
                            <ThemedButton title='Salve' onPress={() => handleSubmit()} />
                        </View>
                    )}
                </Formik>
            ) : undefined}
            {isLoadingWeather ? (
                <ActivityIndicator size={'large'} style={styles.loader} />
            ) : undefined}
            {weatherMapKeys?.map((key) => {
                const id = parseInt(key);
                const weather = weatherMap[id];

                return (
                    <WeatherCard key={key} weather={weather} onClose={() => deleteWeather(id)} />
                );
            })}
        </BaseScreen>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    main: { justifyContent: 'flex-start' },
    loader: { marginVertical: 20 },
});
