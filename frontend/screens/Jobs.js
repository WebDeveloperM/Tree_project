import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";

import InvestorFooter from "../components/InvestorFooter";


export default function Jobs() {
    const navigation = useNavigation()

    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <Text className='text-[30px] font-semibold my-8 '>Job</Text>
            <View className='items-center'>
                <View className='w-[80%] mb-10 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='border-2 border-[#1B772E] rounded-2xl p-2 bg-white mr-3'>
                        <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[20px] text-[#0AC16D] font-semibold'>100 piece</Text>
                        <Text className='text-[12px]'>9.000.000</Text>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-14 h-14' source={require('../assets/backgroundVektor.png')} />
                    </View>
                </View>
                <View className='w-[80%] mb-10 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='border-2 border-[#1B772E] rounded-2xl p-2 bg-white mr-3'>
                        <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[20px] text-[#0AC16D] font-semibold'>100 piece</Text>
                        <Text className='text-[12px]'>9.000.000</Text>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-14 h-14' source={require('../assets/backgroundRounded.png')} />
                    </View>
                </View>
                <View className='w-[80%] mb-10 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='border-2 border-[#1B772E] rounded-2xl p-2 bg-white mr-3'>
                        <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[20px] text-[#0AC16D] font-semibold'>100 piece</Text>
                        <Text className='text-[12px]'>9.000.000</Text>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-14 h-14' source={require('../assets/backgroundRounded.png')} />
                    </View>
                </View>
                <View className='w-[80%] mb-10 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='border-2 border-[#1B772E] rounded-2xl p-2 bg-white mr-3'>
                        <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[20px] text-[#0AC16D] font-semibold'>100 piece</Text>
                        <Text className='text-[12px]'>9.000.000</Text>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-14 h-14' source={require('../assets/backgroundRounded.png')} />
                    </View>
                </View>
            </View>
            <InvestorFooter />
        </SafeAreaView>
    );
}
