import React from 'react';
import {Image, Text, useWindowDimensions, View} from 'react-native';

export default function DiscoverItem({item}) {
    const {width} = useWindowDimensions()

    return (
        <View className="items-center mx-10">
            <Image
                source={item.image}
                style={{height: "75%", width: width * 0.80, resizeMode: 'contain'}}
            />
            <View className=''>
                <Text className='text-center text-[28px] text-[#31B44C] font-bold'>
                    {item.title}
                </Text>
                <Text className='text-[14px] text-[#31B44C] font-bold text-center h-28 my-4'>
                    {item.subtitle}
                </Text>
            </View>
        </View>
    );
}