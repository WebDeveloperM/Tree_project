import React from 'react';
import {useWindowDimensions, View, Animated} from 'react-native';

export default function Paginator({data, scrollX}) {
    const {width} = useWindowDimensions()

    return (
        <View className="flex-row h-6">
            {data && data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 30, 10],
                    extrapolate: 'clamp'
                })

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3,1,0.3],
                    extrapolate: 'clamp'
                })
                return <Animated.View
                    style={{width: dotWidth,opacity}}
                    className={`h-1 mx-1 rounded-full bg-[#31B44C]`}
                    key={i.toString()}
                ></Animated.View>
            })}
        </View>
    );
}