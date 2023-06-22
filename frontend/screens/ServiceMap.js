import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View, Dimensions, Text, Image, Pressable} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";

export default function ServiceMap() {
    const navigation = useNavigation()
    const route = useRoute();
    const location = route.params.location.split(',')

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
        <View style={styles.container}>
            <View className='absolute z-10 top-0 left-0 w-full h-56 bg-[#E6F6E9]'>
            <Pressable
                onPress={() => navigation.navigate('Jobs')}
                className='absolute z-10 top-10 left-3 flex-row items-center'
            >
                <Image source={require('../assets/arrow-back.png')}/>
                <Text className='text-xl font-semibold ml-2'>Back</Text>
            </Pressable>
                </View>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION}>
                <Marker coordinate={{latitude: +location[0], longitude: +location[1]}}/>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});