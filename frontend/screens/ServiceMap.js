import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Dimensions, Text, Image, Pressable, Alert} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import Button from "../components/common/Button";
import {ORDER_CHANGE} from "./utils/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ServiceMap() {
    const navigation = useNavigation()
    const route = useRoute();
    const jobInfo = route.params.job
    const location = jobInfo.location.split(',')
    const address = jobInfo.address.split(', ')
    const country = address[2]
    const city = address[1]
    const street = address[0]

    const {width, height} = Dimensions.get("window")

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_POSITION = {
        latitude: +location[0],
        longitude: +location[1],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };

    const getOrder = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            let data = JSON.stringify({
                "id": jobInfo.id
            });
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: ORDER_CHANGE,
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            let response = await axios.request(config)
            if (response.data.msg === "OK") {
                navigation.navigate('MyWork')
            }
        } catch (error) {
            Alert.alert('Something went wrong')
            navigation.navigate('Jobs')
            console.log(error, 'error')
        }
    }

    return (
        <View className='flex-1'>
            <View
                className='absolute z-10 top-0 left-0 w-full rounded-b-2xl bg-[#E6F6E9]
                border border-gray-400 flex-row p-4 pt-14 items-center justify-around'>
                <View className='w-[15%]'>
                    <Pressable
                        onPress={() => navigation.navigate('Jobs')}
                        className='w-10 h-10 bg-[#31B44C] rounded-full items-center justify-center pr-1'
                    >
                        <Image source={require('../assets/arrow-left-white.png')}/>
                    </Pressable>
                </View>
                <View className='w-[67%]'>
                    <Text className='font-semibold text-[15px] text-[#31B44C] text-center'>{country}</Text>
                    <Text className='font-semibold text-[20px] text-[#31B44C] my-2'>{city} city, {street}</Text>
                    <Text className='text-[18px] text-center'>{jobInfo.count} trees</Text>
                </View>
                <View className='w-[15%]'>
                    <View
                        className='border border-[#1B772E] rounded-2xl w-[100%] p-2 justify-center items-center bg-white'>
                        <Image className='h-10 w-10' source={require('../assets/tree.png')}/>
                    </View>
                </View>
            </View>
            <MapView
                className='w-full h-full'
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_POSITION}
                mapType={'satellite'} // standard
            >
                <Marker coordinate={{latitude: +location[0], longitude: +location[1]}}/>
            </MapView>
            <Pressable
                onPress={getOrder}
                className='absolute bg-black z-10 bottom-16 w-full px-10 bg-transparent rounded-2xl'>
                <Button text={'Receive'}/>
            </Pressable>
        </View>
    );
}