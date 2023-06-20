import React from 'react';
import {Text, View} from 'react-native';


export default function Button({text}) {

    return (
        <View className="w-full h-12 items-center justify-center bg-[#31B44C] rounded-2xl">
            <Text className='text-[15px] font-semibold text-white'>{text}</Text>
        </View>
    );
}
