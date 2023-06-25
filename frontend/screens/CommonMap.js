import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Dimensions, Text, Image, Pressable, Alert} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import Button from "../components/common/Button";
import {GET_JOBS, LAST_ORDERS, ORDER_CHANGE} from "./utils/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function CommonMap() {
    const [locations, setLocations] = useState(null)
    const navigation = useNavigation()
    // const route = useRoute();

    const {width, height} = Dimensions.get("window")

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.1;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_POSITION = {
        latitude: 39.77472,
        longitude: 64.42861,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    };

    useEffect(() => {
        getLocations()
    }, [])

    const getLocations = async () => {
        const token = await AsyncStorage.getItem('token')
        try {
            const response = await axios.get(LAST_ORDERS)
            setLocations(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error, "error")
        }
    }

    return (
        <View className='flex-1'>
            <View
                className='absolute z-10 top-0 left-0 w-full rounded-b-2xl bg-[#31B44C]
                border border-gray-400 flex-row p-4 pt-14 items-center '>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image className='w-4 h-8' source={require('../assets/arrow-left-white.png')}/>
                </Pressable>
                <Text className='text-white text-[56px] font-semibold ml-4'>3+1</Text>
            </View>
            <MapView
                className='w-full h-full'
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_POSITION}
                mapType={'standard'} // satellite
            >
                {locations && locations.map(location => (
                    <Marker
                        key={location.id}
                        coordinate={{latitude: location.location.split(',')[0], longitude: location.location.split(',')[1]}}
                    />
                ))}
            </MapView>
        </View>
    );
}