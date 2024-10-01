import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { API_KEY } from '@/constants/Api';
import { LocationRequest, WeatherResponse } from '@/types/weather';
import { Alert } from 'react-native';

export interface WeatherAppState {
    isLoggedIn: boolean;
    isLoadingWeather: boolean;
    weatherMap: { [id: number]: WeatherResponse };
    units: 'metric' | 'imperial';
}

const initialState: WeatherAppState = {
    isLoggedIn: false,
    isLoadingWeather: false,
    weatherMap: {},
    units: 'metric',
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

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        deleteWeather: (state, action: PayloadAction<number>) => {
            if (state.weatherMap[action.payload]) {
                delete state.weatherMap[action.payload];
            }
        },
    },
    extraReducers(builder) {
        builder
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
            });
    },
});

export const { setIsLoggedIn, deleteWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
