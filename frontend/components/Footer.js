import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";


export default function Footer() {
    const navigation = useNavigation()

    return (
        <View className="absolute bottom-10 flex-row items-center justify-around bg-[#D6F0DB] w-[90%] h-16 rounded-2xl">
            <Pressable>
                <Image source={require('../assets/home-icon.png')} />
            </Pressable>
            <Pressable>
                <Image source={require('../assets/stats-icon.png')} />
            </Pressable>
            <Pressable>
                <Image source={require('../assets/add-icon.png')} />
            </Pressable>
            <Pressable>
                <Image source={require('../assets/location-green.png')} />
            </Pressable>
            <Pressable>
                <Image source={require('../assets/user-icon.png')} />
            </Pressable>
        </View>
    );
}
