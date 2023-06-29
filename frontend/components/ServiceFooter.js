import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";


export default function ServiceFooter() {
    const navigation = useNavigation()

    return (
        <View
            className="fixed mx-auto bottom-0 flex-row items-center justify-around bg-[#D6F0DB] w-[90%] h-16 rounded-2xl">
            <Pressable onPress={() => navigation.navigate('Jobs')}>
                <Image className='w-8 h-8' source={require('../assets/home-icon.png')}/>
            </Pressable>
            <Pressable>
                <Image className='w-8 h-8' source={require('../assets/stats-icon.png')}/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('MyWork')}>
                <Image className='w-18 h-18 mb-6' source={require('../assets/camera-icon.png')}/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('CommonMap')}>
                <Image className='w-8 h-10' source={require('../assets/location-green.png')}/>
            </Pressable>
            <Pressable>
                <Image className='w-8 h-10' source={require('../assets/user-icon.png')}/>
            </Pressable>
        </View>
    );
}
