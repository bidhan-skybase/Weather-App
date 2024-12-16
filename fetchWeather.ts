import axios from 'axios';

const baseUrl:string="http://api.weatherapi.com/v1"
const APIKEY:string="6f08ecc5d2bf4716bf554952241312"

const fetchCurrentWeather=async ()=>{
    console.log("current weater is called")
    const configurationObject = {
        method: 'get',
        url:`${baseUrl}/current.json?key=${APIKEY}&q=37.333,-122.032&aqi=no`
    };
    const response = await axios(configurationObject);
    console.log(response.data)
}
export default fetchCurrentWeather;
