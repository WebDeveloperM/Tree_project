import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";


export default function PhotoConfirmation() {
    const navigation = useNavigation()
    const route = useRoute();
    let image = "https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg"

    const backToCamera = () => {
        navigation.navigate('ServiceCamera')
    }

    return (
        <View className="flex-1 items-center justify-center">
            <Image source={{uri: image}} className='w-full h-[70%]'/>
            <View className='w-full flex-row p-8 justify-between'>
                <Pressable
                    onPress={() => backToCamera()}
                    className='w-[48%] h-14 bg-[#31B44C33] items-center justify-center rounded-2xl'>
                    <Text className='font-bold text-[15px] text-[#31B44C]'>A new</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('CompleteJob')}
                    className='w-[48%] h-14 bg-[#31B44C] items-center justify-center rounded-2xl'>
                    <Text className='font-bold text-[15px] text-white'>Send</Text>
                </Pressable>
            </View>
        </View>
    );
}
