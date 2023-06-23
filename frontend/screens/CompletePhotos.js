import React from 'react';
import {Image, SafeAreaView, ScrollView, View} from 'react-native';
import Button from "../components/common/Button";


export default function CompletePhotos() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View className="w-full h-full items-center p-10">
                    <View className='flex-row flex-wrap justify-between'>
                        <View
                            className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                            <Image source={require('../assets/camera-icon-2.png')}/>
                        </View>
                        <View
                            className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                            <Image source={require('../assets/camera-icon-2.png')}/>
                        </View>
                        <View
                            className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                            <Image source={require('../assets/camera-icon-2.png')}/>
                        </View>
                        <View
                            className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                            <Image source={require('../assets/camera-icon-2.png')}/>
                        </View>
                        <View
                            className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                            <Image source={require('../assets/camera-icon-2.png')}/>
                        </View>
                        <View
                            className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                            <Image source={require('../assets/camera-icon-2.png')}/>
                        </View>
                        <View
                            className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                            <Image source={require('../assets/camera-icon-2.png')}/>
                        </View>
                        <View
                            className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                            <Image source={require('../assets/camera-icon-2.png')}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View className='w-full absolute bottom-0 p-10'>
                <Button text={'Complete'}/>
            </View>
        </SafeAreaView>
    );
}
