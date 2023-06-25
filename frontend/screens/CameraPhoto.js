import React from 'react';
import {Image, Text, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";


export default function CameraPhoto() {
    const navigation = useNavigation()
    const route = useRoute();

    const {image, setImage} = route?.params
    const openCamera = () => {
        setImage(null)
        navigation.navigate('ServiceCamera')
    }


    return (
        <View className="flex-1 items-center justify-center">
            <Image source={{uri: image}} className='w-full h-[70%]'/>
            <View className='flex-row p-7 justify-between w-full'>
                <View className='w-[46%] h-14 bg-[#31B44C33] rounded-2xl items-center justify-center'>
                    <Text className='text-[15px] font-bold text-[#31B44C]'>A new</Text>
                </View>
                <View className='w-[46%] h-14 bg-[#31B44C] rounded-2xl items-center justify-center'>
                    <Text className='text-[15px] font-bold text-white'>Send</Text>
                </View>
            </View>
        </View>
    );
}
