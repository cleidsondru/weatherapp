export type LocationRequest = { city: string; countryCode: string };

export type WeatherDesc = {
    description: string;
    icon: string;
    id: number;
    main: string;
};

export type MainWeather = {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
};

export type WeatherResponse = {
    base: string;
    clouds: {
        all: number;
    };
    cod: number;
    coord: {
        lat: number;
        lon: number;
    };
    dt: number;
    id: number;
    main: MainWeather;
    name: string;
    sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
        type: number;
    };
    timezone: number;
    visibility: number;
    weather: WeatherDesc[];
    wind: {
        deg: number;
        speed: number;
    };
};
