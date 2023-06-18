import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import InvestorFooter from "../components/InvestorFooter";


export default function MyWork() {
    const navigation = useNavigation()

    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <Text className='text-[30px] font-semibold my-8 '>My work</Text>
            <View className='items-center'>
                <View
                    className='w-[80%] mb-10 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='mr-3'>
                        <Image className='w-12 h-14' source={require('../assets/location-green.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[17px] text-[#0AC16D] font-semibold'>Sheikh ul-Islom Mosque</Text>
                        <View className='flex-row'>
                            <Text className='text-[17px] mr-5'>100 piece</Text>
                            <View className='h-5 w-16 bg-[#31B44C]/20 items-center justify-center rounded'>
                                <Text className='text-[14px] font-bold text-[#31B44C]'>Get it</Text>
                            </View>
                        </View>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-14 h-14' source={require('../assets/backgroundVektor.png')}/>
                    </View>
                </View>
                <View
                    className='w-[80%] mb-10 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='mr-3'>
                        <Image className='w-12 h-14' source={require('../assets/location-green.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[17px] text-[#0AC16D] font-semibold'>Sheikh ul-Islom Mosque</Text>
                        <View className='flex-row'>
                            <Text className='text-[17px] mr-5'>100 piece</Text>
                            <View className='h-5 w-16 bg-[#31B44C]/20 items-center justify-center rounded'>
                                <Text className='text-[14px] font-bold text-[#31B44C]'>Get it</Text>
                            </View>
                        </View>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-14 h-14' source={require('../assets/backgroundVektor.png')}/>
                    </View>
                </View>
                <View
                    className='w-[80%] mb-10 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='mr-3'>
                        <Image className='w-12 h-14' source={require('../assets/location-green.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[17px] text-[#0AC16D] font-semibold'>Sheikh ul-Islom Mosque</Text>
                        <View className='flex-row'>
                            <Text className='text-[17px] mr-5'>100 piece</Text>
                            <View className='h-5 w-16 bg-[#31B44C]/20 items-center justify-center rounded'>
                                <Text className='text-[14px] font-bold text-[#31B44C]'>Get it</Text>
                            </View>
                        </View>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-14 h-14' source={require('../assets/backgroundVektor.png')}/>
                    </View>
                </View>
                <View
                    className='w-[80%] mb-10 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='mr-3'>
                        <Image className='w-12 h-14' source={require('../assets/location-green.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[17px] text-[#0AC16D] font-semibold'>Sheikh ul-Islom Mosque</Text>
                        <View className='flex-row'>
                            <Text className='text-[17px] mr-5'>100 piece</Text>
                            <View className='h-5 w-16 bg-[#31B44C]/20 items-center justify-center rounded'>
                                <Text className='text-[14px] font-bold text-[#31B44C]'>Get it</Text>
                            </View>
                        </View>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-14 h-14' source={require('../assets/backgroundVektor.png')}/>
                    </View>
                </View>
            </View>
            <InvestorFooter/>
        </SafeAreaView>
    );
}
