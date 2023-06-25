import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";


export default function CompleteJob() {
    const navigation = useNavigation()

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className='w-60 h-60 bg-[#31B44C] rounded-full justify-center items-center'>
                <Image source={require('../assets/Vector.png')}/>
            </View>
            <Text className='text-black text-[36px] font-semibold my-5'>You sent a photo</Text>
            <Pressable
                onPress={() => navigation.navigate('Jobs')}
                className="w-[305px] h-[50px] bg-[#31B44C33] rounded-2xl items-center justify-center my-2"
            >
                <Text className="text-green-500 text-[15px] font-bold">On the main</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('MyWork')}
                className="w-[305px] h-[50px] bg-[#31B44C] rounded-2xl items-center justify-center my-2">
                <Text className="w-[65px] text-white text-[15px] font-semibold">Planted</Text>
            </Pressable>
        </View>
    );
}
