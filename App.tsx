import React, { useState, useEffect } from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text, Pressable, ActivityIndicator} from 'react-native';
import AppColors from './constants/colors';
import CustomText from "./components/CustomTextComponent";
import Messages from "./constants/messages";
import AirIcon from './assets/icons/air.svg';
import WaterIcon from './assets/icons/water.svg';
import VisionIcon from './assets/icons/vision.svg';
import WeeklyForecasts from "./constants/weekly_forecasts";
import {useFonts} from "expo-font";
import * as Location from 'expo-location';

export default function App() {
    // Consolidate hooks at the top of the component
    const [loaded] = useFonts({
        'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
        'DMSans-ExtraBold': require('./assets/fonts/DMSans-ExtraBold.ttf'),
        'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
        'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
        'DMSans-SemiBold': require('./assets/fonts/DMSans-SemiBold.ttf'),
    });

    const [themeColor, setThemeColor] = useState(() => {
        const colors = [AppColors.yellowColor, AppColors.blueColor, AppColors.pinkColor];
        return colors[Math.floor(Math.random() * colors.length)];
    });

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
                setLocation(locationData);
            } catch (error) {
                setErrorMsg('Error fetching location');
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    // Early return if fonts are not loaded
    if (!loaded) {
        return null;
    }

    // Early return for loading state
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView style={[styles.main,{backgroundColor:themeColor}]}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.textContainer}>
                    <CustomText fontWeight="Bold" fontSize={30} style={{paddingBottom:20}}>Paris</CustomText>
                    <View style={styles.dateContainer}>
                        <CustomText fontWeight={"Regular"} fontSize={14} fontColor={themeColor}> Friday, 20 January</CustomText>
                    </View>
                    <CustomText fontWeight={"SemiBold"} fontSize={20} > Sunny </CustomText>
                    <View style={{flexDirection:"row"}}>
                        <CustomText fontWeight={"Medium"} fontSize={200} >28</CustomText>
                        <CustomText fontSize={120}>°</CustomText>
                    </View>
                </View>
                <Text>text</Text>
                <View style={{justifyContent:"flex-start",alignItems:"flex-start",paddingBottom:10}}>
                    <CustomText fontWeight={"SemiBold"} fontSize={20} style={{paddingBottom:8}}>Daily Summary</CustomText>
                    <CustomText style={{paddingBottom:8}}>
                        {Messages.lorem}
                    </CustomText>

                    <View style={styles.statsContainer}>
                        <View style={{alignItems:"center"}}>
                            <AirIcon height={40} width={40} fill={themeColor} />
                            <CustomText fontWeight={"Bold"} fontSize={16} fontColor={themeColor} style={{paddingTop:12}}>4km/h</CustomText>
                            <CustomText fontWeight={"SemiBold"} fontSize={12} fontColor={themeColor}>Wind</CustomText>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <WaterIcon height={40} width={40} fill={themeColor} />
                            <CustomText fontWeight={"Bold"} fontSize={16} fontColor={themeColor} style={{paddingTop:12}}>62%</CustomText>
                            <CustomText fontWeight={"SemiBold"} fontSize={12} fontColor={themeColor}>Humidity</CustomText>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <VisionIcon height={40} width={40} fill={themeColor} />
                            <CustomText fontWeight={"Bold"} fontSize={16} fontColor={themeColor} style={{paddingTop:12}}>1km</CustomText>
                            <CustomText fontWeight={"SemiBold"} fontSize={12} fontColor={themeColor}>Visibility</CustomText>
                        </View>
                    </View>
                </View>

                <View>
                    <CustomText fontWeight={'SemiBold'} fontSize={20} style={{paddingBottom:10}}>Weekly forecast</CustomText>
                    <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                        {WeeklyForecasts.map((c, index) => (
                            <View key={index} style={styles.weeklyContainer}>
                                <CustomText fontSize={16} fontWeight={'Bold'} style={{ paddingBottom: 8 }}>
                                    {c.temp}°
                                </CustomText>
                                <c.icon width={40} height={40} fill={AppColors.textColor}/>
                                <CustomText fontSize={12} fontWeight={'SemiBold'} style={{ paddingTop: 8 }}>
                                    {c.date}
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

