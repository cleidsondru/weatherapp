import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { ThemedText, ThemedTextProps } from './ThemedText';

const TempUnit = (props: ThemedTextProps) => {
    const unit = useAppSelector((state) => state.weather.units);

    return <ThemedText {...props}>{`${unit === 'metric' ? '˚C' : '˚F'}`}</ThemedText>;
};

export default TempUnit;
