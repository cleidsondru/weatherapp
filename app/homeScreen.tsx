import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BaseScreen from '@/components/BaseScreen';
import { Formik } from 'formik';
import { object, string } from 'yup';
import ThemedTextInput from '@/components/ThemedTextInput';
import { ThemedText } from '@/components/ThemedText';
import ThemedButton from '@/components/ThemedButton';
import { FontAwesome5 } from '@expo/vector-icons';

const locationSchema = object({
    city: string().required('A city name is required'),
    countryCode: string().required('A country code is required'),
});

const HomeScreen = () => {
    const addLocation = (data: { city: string; countryCode: string }) => console.log(data);

    return (
        <BaseScreen style={styles.main}>
            <Formik
                initialValues={{ city: '', countryCode: '' }}
                validationSchema={locationSchema}
                onSubmit={addLocation}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <View style={{ width: '100%' }}>
                        <View style={styles.inputContainer}>
                            <ThemedTextInput
                                onChangeText={handleChange('city')}
                                value={values.city}
                                placeholder='City name'
                            />
                            {errors.city ? (
                                <ThemedText lightColor='red' darkColor='red'>
                                    {errors.city}
                                </ThemedText>
                            ) : undefined}
                        </View>
                        <View style={styles.inputContainer}>
                            <ThemedTextInput
                                onChangeText={handleChange('countryCode')}
                                value={values.countryCode}
                                placeholder='Country code'
                            />
                            {errors.countryCode ? (
                                <ThemedText lightColor='red' darkColor='red'>
                                    {errors.countryCode}
                                </ThemedText>
                            ) : undefined}
                        </View>
                        <ThemedButton title='Salve' onPress={() => handleSubmit()} />
                    </View>
                )}
            </Formik>
            <View style={styles.weatherMiniView}>
                <TouchableOpacity style={styles.deleteButton} onPress={() => console.log('delete')}>
                    <FontAwesome5 name='times' size={20} />
                </TouchableOpacity>
                <ThemedText type='subtitle'>CityName, CountryCode</ThemedText>
                <ThemedText type='subtitle'>
                    Max: <ThemedText type='default'>MaxTemp</ThemedText>{' '}
                </ThemedText>
                <ThemedText type='subtitle'>
                    Min: <ThemedText type='default'>MinTemp</ThemedText>{' '}
                </ThemedText>
            </View>
        </BaseScreen>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    main: { justifyContent: 'flex-start', paddingTop: 50 },
    inputContainer: { width: '100%', marginBottom: 30 },
    weatherMiniView: {
        marginTop: 30,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },
    deleteButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
        zIndex: 10,
    },
});
