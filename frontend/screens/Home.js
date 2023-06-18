import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Footer from "../components/Footer";


export default function Home() {
    const navigation = useNavigation()

    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <View className='h-56 w-full bg-gray-400 items-center justify-center'>
                <Text>view for chart</Text>
            </View>
            <Text className='text-[30px] font-semibold my-12'>Wellcome</Text>
            <View className='items-center w-full'>
                <View className='w-[80%] mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='border-2 border-[#1B772E] rounded-2xl p-2 bg-white mr-3'>
                        <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[20px] text-[#0AC16D] font-semibold'>The first tree</Text>
                        <Text className='text-[12px] my-1'>15 tree</Text>
                        <Text className='text-[12px]'>Lorem ipsum</Text>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-12 h-14' source={require('../assets/location-green.png')} />
                    </View>
                </View>
                <View className='w-[80%] mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='border-2 border-[#1B772E] rounded-2xl p-2 bg-white mr-3'>
                        <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[20px] text-[#0AC16D] font-semibold'>The first tree</Text>
                        <Text className='text-[12px] my-1'>15 tree</Text>
                        <Text className='text-[12px]'>Lorem ipsum</Text>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-12 h-14' source={require('../assets/location-green.png')} />
                    </View>
                </View>
                <View className='w-[80%] mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                    <View className='border-2 border-[#1B772E] rounded-2xl p-2 bg-white mr-3'>
                        <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                    </View>
                    <View className=''>
                        <Text className='text-[20px] text-[#0AC16D] font-semibold'>The first tree</Text>
                        <Text className='text-[12px] my-1'>15 tree</Text>
                        <Text className='text-[12px]'>Lorem ipsum</Text>
                    </View>
                    <View className='ml-auto mr-2'>
                        <Image className='w-12 h-14' source={require('../assets/location-green.png')} />
                    </View>
                </View>
            </View>
            <Footer />
        </SafeAreaView>
    );
}
