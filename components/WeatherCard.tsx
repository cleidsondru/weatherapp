import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import TempUnit from './TempUnit';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { WeatherResponse } from '@/types/weather';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteWeather, fetchWeather } from '@/store/weatherSlice';

interface WeatherCardProps {
    weather: WeatherResponse;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
    const borderColor = useThemeColor({}, 'borderColor');
    const iconColor = useThemeColor({}, 'tabIconDefault');
    const dispatch = useAppDispatch();
    const units = useAppSelector((state) => state.weather.units);

    const reloadData = () => {
        dispatch(fetchWeather({ city: weather.name, countryCode: weather.sys.country }));
    };
    const close = () => {
        dispatch(deleteWeather(weather.id));
    };
    useEffect(() => {
        reloadData();
    }, [units]);

    return (
        <View style={[styles.weatherMiniView, { borderColor, gap: 10 }]}>
            <TouchableOpacity style={styles.deleteButton} onPress={close}>
                <FontAwesome5 name='times' size={20} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={reloadData}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
                            }}
                            style={styles.image}
                            resizeMode='contain'
                        />
                        <ThemedText type='title'>
                            {weather.main.temp} <TempUnit type='title' />
                        </ThemedText>
                    </View>
                    <ThemedText type='subtitle'>{`${weather.weather[0].description.toUpperCase()}`}</ThemedText>
                    <ThemedText type='subtitle'>{`${weather.name}, ${weather.sys.country}`}</ThemedText>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ gap: 5 }}>
                        <ThemedText type='subtitle'>
                            Max:{' '}
                            <ThemedText type='default'>
                                {weather.main.temp_max} <TempUnit />
                            </ThemedText>
                        </ThemedText>
                        <ThemedText type='subtitle'>
                            Min:{' '}
                            <ThemedText type='default'>
                                {weather.main.temp_min} <TempUnit />
                            </ThemedText>
                        </ThemedText>
                    </View>
                    <View style={{ gap: 5 }}>
                        <ThemedText type='subtitle'>
                            Clouds: <ThemedText type='default'>{weather.clouds.all} %</ThemedText>
                        </ThemedText>
                        <ThemedText type='subtitle'>
                            Humidity:{' '}
                            <ThemedText type='default'>{weather.main.humidity} %</ThemedText>
                        </ThemedText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default WeatherCard;

const styles = StyleSheet.create({
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
    imageContainer: { flexDirection: 'row', alignItems: 'center', gap: 20 },
    image: { width: 70, height: 70 },
});
