import {WeeklyForecast} from "../type";
import SunIcon from '../assets/icons/sun.svg';
import PartlyCloudy from '../assets/icons/partly_cloudy.svg';
import Thunder from '../assets/icons/thunder.svg';
import Rainy from '../assets/icons/rainy.svg';


const WeeklyForecasts:WeeklyForecast[]=[
    {
        temp:26,
        icon:SunIcon,
        date:"21 Jan"
    },
    {
        temp:25,
        icon:PartlyCloudy,
        date:"22 Jan"
    },
    {
        temp:27,
        icon:Rainy,
        date:"23 Jan"
    },{
        temp:26,
        icon:Thunder,
        date:"24 Jan"
    },

]

export default WeeklyForecasts;
