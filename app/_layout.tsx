import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    bcrypt.setRandomFallback((len) => {
        const buf = new Array<number>(len);
        return buf.map(() => Math.floor(isaac.random() * 256));
    });
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Stack initialRouteName='(tabs)' screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='index' />
                        <Stack.Screen name='(tabs)' />
                        <Stack.Screen name='authScreen' />
                        <Stack.Screen name='+not-found' />
                    </Stack>
                </ThemeProvider>
            </SafeAreaView>
        </Provider>
    );
}
