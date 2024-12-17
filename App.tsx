import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View,Text} from 'react-native';
import AppColors from './constants/colors';
import CustomText from "./components/CustomTextComponent";
import AirIcon from './assets/icons/air.svg';
import WaterIcon from './assets/icons/water.svg';
import VisionIcon from './assets/icons/vision.svg';
import {useFonts} from "expo-font";
import * as Location from 'expo-location';
import {WeatherModel} from "./WeatherModel";
import axios from "axios";
import Cloudy from './assets/icons/partly_cloudy.svg';
import Sun from './assets/icons/sun.svg';
import Thunder from './assets/icons/thunder.svg';
import Rainy from './assets/icons/rainy.svg';
import Up from './assets/icons/up.svg';
import Down from './assets/icons/down.svg';
import Snow from './assets/icons/snow.svg';
import Fog from './assets/icons/fog.svg';
import {formatDate, getCurrentDate} from "./utils/dateUtils";




export default function App() {
    const [loaded] = useFonts({
        'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
        'DMSans-ExtraBold': require('./assets/fonts/DMSans-ExtraBold.ttf'),
        'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
        'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
        'DMSans-SemiBold': require('./assets/fonts/DMSans-SemiBold.ttf'),
    });



    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [address, setAddress] = useState<Location.LocationGeocodedAddress|null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const [weatherData,setWeatherData]=useState<WeatherModel>();


    const apiUrl: string = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/27.222%2C83.999/2024-12-16/2024-12-20?unitGroup=metric&include=days&key=A6G98HA6NK8KXXMMYS266XXVF&contentType=json';

    const fetchWeather=async ()=>{
   try{

       const response=await axios.get(apiUrl);
       const data=response.data;
       setWeatherData(data);

   }catch(e:any){
       console.log(e.message);
   }
    }

    useEffect(() => {
        fetchWeather();
    }, []);


    const getThemeColorByTemperature = (temperature:number) => {
        if (temperature <= 5) {
            return AppColors.cyanColor; // Chilly
        } else if (temperature > 5 && temperature <= 15) {
            return AppColors.blueColor; // Cold
        } else if (temperature > 15 && temperature <= 20) {
            return AppColors.lightOrange; // Cool
        } else if (temperature > 20 && temperature <= 25) {
            return AppColors.yellowColor; // Moderate
        } else if (temperature > 25 && temperature <= 30) {
            return AppColors.orangeColor; // Warm
        } else if (temperature > 30 && temperature <= 35) {
            return AppColors.pinkColor; // Hot
        } else {
            return AppColors.purpleColor; // Very Hot
        }
    };

    const [themeColor, setThemeColor] = useState(() => {
        const initialTemperature = weatherData?.days[0].temp||20;
        return getThemeColorByTemperature(initialTemperature);
    });


    // Consolidate useEffects
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let locationData = await Location.getCurrentPositionAsync({});
                let address=await Location.reverseGeocodeAsync(
                    {
                        latitude:locationData.coords.latitude,
                        longitude:locationData.coords.longitude,
                    }
                )
                if (address.length > 0) {
                    const currentAddress = address[0];
                    setAddress(currentAddress);
                }
                setLocation(locationData);
            } catch (error) {
                setErrorMsg('Error fetching location');
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    if (!loaded) {
        return null;
    }

    // Early return for loading state
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    const logConditions = () => {
        if (weatherData) {
            weatherData.days.slice(1,5).forEach((day, index) => {
                console.log(`Day ${index + 1} Conditions:`, day.conditions);
            });
        }
    };

    return (
        <SafeAreaView style={[styles.main,{backgroundColor:themeColor}]}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.textContainer}>
                    <CustomText fontWeight="Bold" fontSize={30} style={{paddingBottom:20}}>{address?.city}</CustomText>
                    <View style={styles.dateContainer}>
                        <CustomText fontWeight={"Regular"} fontSize={14} fontColor={themeColor}> {currentDate}</CustomText>
                    </View>
                    <CustomText fontWeight={"SemiBold"} fontSize={20} > {weatherData?.days[0].conditions} </CustomText>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                    <Up fill={"black"}></Up>
                    <CustomText fontWeight={"Medium"}>{weatherData?.days[0].tempmax}°</CustomText>
                </View>
                <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"center"}}>
                  <Text style={{
                      fontSize: 190,
                      includeFontPadding: false,
                      textAlignVertical: "bottom",
                      lineHeight: 200,
                      fontFamily:"DMSans-Medium",
                      bottom: -40
                  }}>{weatherData?.days[0].temp}</Text>
                    <Text
                        style={{
                            fontSize: 120,
                            fontWeight: "300",
                            includeFontPadding: false,
                            textAlignVertical: "top",
                            lineHeight: 120,
                            paddingLeft: 0,
                            margin: 0
                        }}
                    >
                        °
                    </Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",paddingBottom:8}}>
                    <Down fill={"black"} ></Down>
                    <CustomText fontWeight={"Medium"}> {weatherData?.days[0].tempmin}°</CustomText>
                </View>
                <View style={{justifyContent:"flex-start",alignItems:"flex-start",paddingBottom:10}}>
                    <CustomText fontWeight={"SemiBold"} fontSize={20} style={{paddingBottom:8}}>Daily Summary</CustomText>
                    <CustomText style={{paddingBottom:8}}>
                        {weatherData?.days[0].description}
                    </CustomText>

                    <View style={styles.statsContainer}>
                        <View style={{alignItems:"center"}}>
                            <AirIcon height={40} width={40} fill={themeColor} />
                            <CustomText fontWeight={"Bold"} fontSize={16} fontColor={themeColor} style={{paddingTop:12}}>{weatherData?.days[0].windspeed}km/h</CustomText>
                            <CustomText fontWeight={"SemiBold"} fontSize={12} fontColor={themeColor}>Wind</CustomText>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <WaterIcon height={40} width={40} fill={themeColor} />
                            <CustomText fontWeight={"Bold"} fontSize={16} fontColor={themeColor} style={{paddingTop:12}}>{weatherData?.days[0].humidity}%</CustomText>
                            <CustomText fontWeight={"SemiBold"} fontSize={12} fontColor={themeColor}>Humidity</CustomText>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <VisionIcon height={40} width={40} fill={themeColor} />
                            <CustomText fontWeight={"Bold"} fontSize={16} fontColor={themeColor} style={{paddingTop:12}}>{weatherData?.days[0].visibility}km</CustomText>
                            <CustomText fontWeight={"SemiBold"} fontSize={12} fontColor={themeColor}>Visibility</CustomText>
                        </View>
                    </View>
                </View>

                <View>
                    <CustomText fontWeight={'SemiBold'} fontSize={20} style={{paddingBottom:10}}>Weekly forecast</CustomText>
                    <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                        {weatherData?.days.slice(1,5).map((c, index) => (

                            <View key={index} style={styles.weeklyContainer}>

                                <CustomText fontSize={16} fontWeight={'Bold'} style={{ paddingBottom: 8 }}>
                                    {c.temp}°
                                </CustomText>
                                {(() => {
                                    const condition = c.conditions.toLowerCase();
                                    return (
                                        condition.includes('overcast') ? <Fog fill={'black'} /> :
                                        condition.includes('rain') ? <Rainy fill={'black'} /> :
                                            condition.includes('cloud') ? <Cloudy fill={'black'} /> :
                                                condition.includes('clear') ? <Sun fill={'black'} /> :
                                                    condition.includes('snow')?<Snow fill={'black'} /> :
                                                    null
                                    );
                                })()}

                                <CustomText fontSize={12} fontWeight={'SemiBold'} style={{ paddingTop: 8 }}>
                                    {formatDate(c.datetime)} {/* Format datetime */}
                                </CustomText>
                            </View>
                        ))}

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    main: {
        flex: 1,

    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 26,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateContainer:{
        backgroundColor:'black',
        borderRadius:22,
        paddingHorizontal:14,
        paddingVertical:8,
        marginBottom:12,
    },
    statsContainer:{
        backgroundColor:'black',
        borderRadius:12,
        flexDirection:"row",
        justifyContent:'space-evenly',
        paddingVertical:32,
        gap:20,
        width:'100%',
        marginVertical:10,
    },
    weeklyContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        padding: 16,
        borderWidth:2,
        borderColor:AppColors.textColor,

    },
});

