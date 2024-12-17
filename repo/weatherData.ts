import * as Location from 'expo-location';
import {formatDateForApi} from "../utils/dateUtils";
import axios from "axios";

type locationResponse={
    locationData?:Location.LocationObject|undefined,
    currentAddress?:Location.LocationGeocodedAddress|undefined,
    status:boolean
}

class WeatherData{
    API_KEY: string;
    API_URL: string;

    constructor() {
      this.API_KEY = "A6G98HA6NK8KXXMMYS266XXVF";
      this.API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
    }


    async fetchLocation(): Promise<locationResponse> {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {

                return {
                    status:false
                };
            }
            let locationData = await Location.getCurrentPositionAsync({});
            let address=await Location.reverseGeocodeAsync(
                {
                    latitude:locationData.coords.latitude,
                    longitude:locationData.coords.longitude,
                },
            )
            let currentAddress;
            if (address.length > 0) {
                 currentAddress = address[0];
            }
            return {
                locationData:locationData,
                currentAddress:currentAddress,
                status:true
            }

        } catch (error:any) {
            console.log(error)
           throw Error(error);
        }
    }

    async getWeatherData({ location } : {
        location: Location.LocationObject;
    }){

        try{
            const todayDate = new Date();
            const dateAfterFourDays = new Date();
            dateAfterFourDays.setDate(todayDate.getDate() + 4);

            const startDate = formatDateForApi(todayDate);
            const endDate = formatDateForApi(dateAfterFourDays);
            const apiUrl: string = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.coords.latitude}%2C${location.coords.longitude}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${this.API_KEY}&contentType=json`;
            const response=await axios.get(apiUrl);
            const data= response.data;

             return data;

        }catch (e:any) {
            throw Error(e);
        }
    }
}

const weatherClient = new WeatherData();

export default weatherClient;
