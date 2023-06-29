import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {View, Dimensions, Text, Image, Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {LAST_ORDERS} from "./utils/urls";
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
        } catch (error) {
            console.error(error, "error")
        }
    }
    return (
        <View className='flex-1'>
            <View
                className='absolute z-10 top-0 left-0 w-full rounded-b-2xl bg-[#31B44C]
                border border-gray-400 flex-row p-4 pt-14 h-32 items-center '>
                <View className='w-full h-16 bg-white rounded-2xl -mb-20 p-3'>
                    <View className='flex-row w-full h-full bg-[#E6F6E9] rounded-xl items-center'>
                        <Image className='mx-3' source={require('../assets/location-grey.png')}/>
                        <Text className='text-[#31B44C] font-semibold text-[15px]'>
                            {locations && locations[0].address.split(', ')[1]},
                            {locations && ' ' + locations[0].address.split(', ')[2]}
                        </Text>
                    </View>
                </View>
            </View>
            <View className='absolute z-10 bottom-16 left-6'>
                <Pressable
                    onPress={() => navigation.goBack()}
                    className='items-center justify-center w-14 h-14 bg-[#31B44C] rounded-2xl'
                >
                    <Image className='w-4 h-8 mr-1' source={require('../assets/arrow-left-white.png')}/>
                </Pressable>
            </View>
            <MapView
                className='w-full h-full'
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_POSITION}
                mapType={'standard'} // satellite
            >
                {locations && locations.map(location => (
                    <Marker
                        onPress={() => navigation.navigate('CommonMapImages', {location})}
                        key={location.id}
                        coordinate={{
                            latitude: location.location.split(',')[0],
                            longitude: location.location.split(',')[1]
                        }}
                        className='items-center justify-center z-0'
                    >
                        <TouchableOpacity
                            className='p-1 bg-gray-300 rounded-2xl mb-2 relative' style={styles.shadow}>
                            <View className='absolute z-10 right-0 py-1 px-2 bg-[#31B44C] rounded'>
                                <Text className='text-white font-bold test-[20px]'>{location.plants.length}</Text>
                            </View>
                            <Image className='w-16 h-16 rounded-2xl'
                                   source={{uri: `http://127.0.0.1:8000/${location.plants[0].image}`}}/>
                        </TouchableOpacity>
                        <View className='w-6 h-6 rounded-full bg-[#31B44C]/30 items-center justify-center'>
                            <View className='w-4 h-4 rounded-full bg-[#31B44C]'></View>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.21,
        shadowRadius: 8.19,
        elevation: 11,
        zIndex: 999
    }
})