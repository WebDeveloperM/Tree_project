import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View, Dimensions, Text, Image, Pressable} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";

export default function ServiceMap() {
    const navigation = useNavigation()
    const route = useRoute();
    const jobInfo = route.params.job
    const location = jobInfo.location.split(',')

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
                <View className='w-[60%] items-center'>
                    <Text className='font-semibold text-[20px] text-[#31B44C]'>The first tree</Text>
                    <Text className='font-semibold text-[20px] text-[#31B44C]'>The first tree was very</Text>
                    <Text className='text-[15px]'>{jobInfo.count} piece</Text>
                </View>
                <View className='w-[15%]'>
                    <View
                        className='border border-[#1B772E] rounded-2xl w-[100%] p-2 justify-center items-center bg-white'>
                        <Image className='h-10 w-10' source={require('../assets/tree.png')}/>
                    </View>
                </View>
            </View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_POSITION}
                mapType={'satellite'} // standard
            >
                <Marker coordinate={{latitude: +location[0], longitude: +location[1]}}/>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});