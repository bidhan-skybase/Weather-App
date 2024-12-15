import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

type WeeklyForecast = {
    temp: number;
    icon: FC<SvgProps>;
    date: string;
}
