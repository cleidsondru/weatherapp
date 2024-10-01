import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loadState, saveState } from '@/store/weatherSlice';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const userEmail = useAppSelector((state) => state.weather.userEmail);
    const units = useAppSelector((state) => state.weather.units);
    const weatherMap = useAppSelector((state) => state.weather.weatherMap);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (userEmail) {
            dispatch(loadState());
        }
    }, [userEmail]);

    React.useEffect(() => {
        if (units || Object.keys(weatherMap)) {
            dispatch(saveState());
        }
    }, [units, weatherMap]);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='preferencesScreen'
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'code-slash' : 'code-slash-outline'}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
