import React, { useState, useEffect } from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text, Pressable} from 'react-native';
import * as Font from 'expo-font';
import AppColors from './constants/colors';
import CustomText from "./components/CustomTextComponent";
import Messages from "./constants/messages";
import AirIcon from './assets/icons/air.svg';
import WaterIcon from './assets/icons/water.svg';
import  VisionIcon from './assets/icons/vision.svg';
import WeeklyForecasts from "./constants/weekly_forecasts";

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const loadFonts = async () => {
        await Font.loadAsync({
            'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
            'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
            'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
            'DMSans-SemiBold': require('./assets/fonts/DMSans-SemiBold.ttf'),
            'DMSans-ExtraBold': require('./assets/fonts/DMSans-ExtraBold.ttf'),
        });
    };
    useEffect(() => {
        loadFonts()
            .then(() => setFontsLoaded(true))
            .catch(console.warn);
    }, []);

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
    }

    return (
        <SafeAreaView style={styles.main}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.textContainer}>
                    <CustomText fontWeight="Bold" fontSize={30} style={{paddingBottom:20}}>Paris</CustomText>
                    <View style={
                        styles.dateContainer
                    }>
                        <CustomText fontWeight={"Regular"} fontSize={14} fontColor={AppColors.yellowColor}> Friday, 20 January</CustomText>
                    </View>
                    <CustomText fontWeight={"SemiBold"} fontSize={20} > Sunny </CustomText>
                    <View style={{flexDirection:"row"}}>
                        <CustomText fontWeight={"Medium"} fontSize={200} >28</CustomText>
                        <CustomText fontSize={120}>°</CustomText>
                    </View>
                </View>
                <View style={{justifyContent:"flex-start",alignItems:"flex-start",paddingBottom:10}}>
                    <CustomText fontWeight={"SemiBold"} fontSize={20} style={{paddingBottom:8}}>Daily Summary</CustomText>
                    <CustomText style={{paddingBottom:8}}>
                        {Messages.lorem}
                    </CustomText>

                        <View style={styles.statsContainer}>
                            <View style={{alignItems:"center"}}>
                                <AirIcon
                                    height={40}
                                    width={40}
                                    fill={AppColors.yellowColor} > </AirIcon>
                                <CustomText fontWeight={"Bold"} fontSize={16} fontColor={AppColors.yellowColor} style={{paddingTop:12}}>4km/h</CustomText>
                                <CustomText fontWeight={"SemiBold"} fontSize={12}  fontColor={AppColors.yellowColor}>Wind</CustomText>
                            </View>
                            <View style={{alignItems:"center"}}>
                                <WaterIcon
                                    height={40}
                                    width={40}
                                    fill={AppColors.yellowColor} > </WaterIcon>
                                <CustomText fontWeight={"Bold"} fontSize={16} fontColor={AppColors.yellowColor }  style={{paddingTop:12}}>62%</CustomText>
                                <CustomText fontWeight={"SemiBold"} fontSize={12}  fontColor={AppColors.yellowColor}>Humidity</CustomText>
                            </View>
                            <View style={{alignItems:"center"}}>
                                <VisionIcon height={40} width={40} fill={AppColors.yellowColor}></VisionIcon>
                                <CustomText fontWeight={"Bold"} fontSize={16} fontColor={AppColors.yellowColor} style={{paddingTop:12}}>1km</CustomText>
                                <CustomText fontWeight={"SemiBold"} fontSize={12}  fontColor={AppColors.yellowColor}>Visibility</CustomText>
                            </View>
                        </View>
                    </View>

                <View>

                </View>
                <View>
                    <CustomText fontWeight={'SemiBold'} fontSize={20} style={{paddingBottom:10}}>Weekly forecast</CustomText>
                                <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                                    {WeeklyForecasts.map(

                                        (c, index) => (
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
        backgroundColor: AppColors.yellowColor,
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

