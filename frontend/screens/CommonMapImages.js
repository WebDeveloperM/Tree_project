import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";


export default function CommonMapImages() {
    const navigation = useNavigation()
    const route = useRoute()
    const {location} = route.params

    return (
        <View className="flex-1">
            <View
                className='absolute z-10 top-0 left-0 w-full rounded-b-2xl bg-[#31B44C]
                border border-gray-400 flex-row p-4 pt-14 items-center '>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image className='w-4 h-8' source={require('../assets/arrow-left-white.png')}/>
                </Pressable>
                <Text className='text-white text-[56px] font-semibold ml-4'>3+1</Text>
            </View>
            <Image
                className='w-full mt-[10%] h-[80%]'
                source={{uri: `http://127.0.0.1:8000/${location.plants[0].image}`}}
            />
            <View className='bg-[#181818] w-full h-[20%] p-4'>
                <View className='flex-row items-center'>
                    <View className='bg-[#31B44C] rounded-xl w-10 h-10 items-center justify-center mr-3'>
                        <Image source={require('../assets/locaiton-white.png')} />
                    </View>
                    <Text className='text-[16px] text-white font-semibold w-[70%]'>Sheikh ul-Islom Mosque</Text>
                </View>
            </View>
        </View>
    );
}
