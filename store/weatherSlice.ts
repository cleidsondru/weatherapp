import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { API_KEY } from '@/constants/Api';
import { LocationRequest, LoginRequest, WeatherResponse } from '@/types/weather';
import { Alert } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import { TESTER_EMAIL, TESTER_PASSWORD_HASH } from '@/constants/TesterCredentials';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WeatherMap = { [id: number]: WeatherResponse };

type unitType = 'metric' | 'imperial';
export interface WeatherAppState {
    isLoggingIn: boolean;
    isLoadingWeather: boolean;
    isLoadingState: boolean;
    weatherMap: WeatherMap;
    units: unitType;
    userEmail: string;
}

const initialState: WeatherAppState = {
    isLoggingIn: false,
    isLoadingState: false,
    isLoadingWeather: false,
    weatherMap: {},
    units: 'metric',
    userEmail: '',
};

export const fetchWeather = createAsyncThunk<
    WeatherResponse | undefined,
    LocationRequest,
    { state: RootState }
>('FETCH/WEATHER', async ({ city, countryCode }, thunkApi) => {
    try {
        const units = thunkApi.getState().weather.units;
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${API_KEY}&units=${units}`
        );

        if (res.ok) {
            return (await res.json()) as WeatherResponse;
        }
        return undefined;
    } catch (e) {
        console.error(e);
    }
});

export const saveState = createAsyncThunk<void, void, { state: RootState }>(
    'SAVE_STATE/WEATHER',
    async (_, thunkApi) => {
        try {
            const { weatherMap, units } = thunkApi.getState().weather;
            const stringfiedState = JSON.stringify({ weatherMap, units });
            const { userEmail } = thunkApi.getState().weather;
            if (userEmail.length) {
                await AsyncStorage.setItem(`${userEmail}_state`, stringfiedState);
            }
        } catch (e) {
            console.error(e);
        }
    }
);

export const loadState = createAsyncThunk<WeatherAppState, void, { state: RootState }>(
    'LOAD_STATE/WEATHER',
    async (_, thunkApi) => {
        try {
            const { userEmail } = thunkApi.getState().weather;
            if (userEmail.length) {
                const data = await AsyncStorage.getItem(`${userEmail}_state`);
                if (data) return JSON.parse(data);
            }
        } catch (e) {
            console.error(e);
        }
    }
);

export const login = createAsyncThunk<string | undefined, LoginRequest, { state: RootState }>(
    'LOGIN/WEATHER',
    async ({ email, password }) => {
        try {
            if (TESTER_EMAIL && TESTER_PASSWORD_HASH && email === TESTER_EMAIL) {
                const isEmailEqual = bcrypt.compareSync(password, TESTER_PASSWORD_HASH);
                if (isEmailEqual) return email;
            }
            Alert.alert('Invalid Credentials!');
            return undefined;
        } catch (e) {
            console.error(e);
        }
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        deleteWeather: (state, action: PayloadAction<number>) => {
            if (state.weatherMap[action.payload]) {
                delete state.weatherMap[action.payload];
            }
        },
        setUnit: (state, action: PayloadAction<unitType>) => {
            state.units = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userEmail = action.payload;
                }
                state.isLoggingIn = false;
            })
            .addCase(fetchWeather.pending, (state) => {
                state.isLoadingWeather = true;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                if (action.payload) {
                    state.weatherMap = {
                        ...state.weatherMap,
                        [action.payload.id]: action.payload as WeatherResponse,
                    };
                } else {
                    Alert.alert('Location not found.');
                }
                state.isLoadingWeather = false;
            })
            .addCase(loadState.pending, (state) => {
                state.isLoadingState = true;
            })
            .addCase(loadState.fulfilled, (state, action) => {
                if (action.payload) {
                    const { weatherMap, units } = action.payload;
                    state.weatherMap = weatherMap;
                    state.units = units;
                }
                state.isLoadingState = false;
            });
    },
});

export const { deleteWeather, setUnit } = weatherSlice.actions;

export default weatherSlice.reducer;
