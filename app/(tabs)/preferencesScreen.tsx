import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import BaseScreen from '@/components/BaseScreen';
import { ThemedText } from '@/components/ThemedText';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUnit } from '@/store/weatherSlice';
import { useThemeColor } from '@/hooks/useThemeColor';

const preferencesScreen = () => {
    const units = useAppSelector((state) => state.weather.units);
    const dispatch = useAppDispatch();
    const changeUnits = () => {
        if (units === 'imperial') dispatch(setUnit('metric'));
        else dispatch(setUnit('imperial'));
    };
    const disabledButtonColor = useThemeColor({}, 'borderColor');
    const activeButtonColor = useThemeColor({}, 'button');

    return (
        <BaseScreen style={styles.main}>
            <ThemedText type='title'>Set System Units</ThemedText>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={changeUnits}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                units === 'metric' ? disabledButtonColor : activeButtonColor,
                        },
                    ]}
                    disabled={units === 'metric'}
                >
                    <ThemedText type='subtitle'>Metric</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={changeUnits}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                units === 'imperial' ? disabledButtonColor : activeButtonColor,
                        },
                    ]}
                    disabled={units === 'imperial'}
                >
                    <ThemedText type='subtitle'>Imperial</ThemedText>
                </TouchableOpacity>
            </View>
        </BaseScreen>
    );
};

export default preferencesScreen;

const styles = StyleSheet.create({
    main: { justifyContent: 'flex-start', gap: 30 },
    button: {
        width: '40%',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
    },
    container: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
});
