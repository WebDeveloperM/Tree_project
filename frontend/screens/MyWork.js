import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import ServiceFooter from "../components/ServiceFooter";


export default function MyWork() {
     const navigation = useNavigation()

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View className="w-full h-full items-center">
                    <Text className='text-[30px] font-semibold my-8 '>My work</Text>
                    <View className='items-center'>
                        <Pressable
                            onPress={()=> navigation.navigate('CompleteJobPhotos')}
                            className='w-[80%] mb-10 flex-row items-center bg-[#D6F0DB]/30 px-2 py-3 border border-[#1B772E] rounded-2xl'>
                            <View className='mr-2'>
                                <Image className='w-12 h-14' source={require('../assets/location-green.png')}/>
                            </View>
                            <View className=''>
                                <Text className='text-[17px] text-[#0AC16D] font-semibold w-[80%]'>Sheikh ul-Islom Mosque</Text>
                                <View className='flex-row items-center mt-2'>
                                    <Text className='text-[17px] mr-2'>100 piece</Text>
                                    <View className='h-5 w-20 bg-[#31B44C]/20 items-center justify-center rounded-full'>
                                        <Text className='text-[14px] font-bold text-[#31B44C]'>Get it</Text>
                                    </View>
                                </View>
                            </View>
                            <View className='ml-auto mr-2'>
                                <Image className='w-12 h-12' source={require('../assets/backgroundVektor.png')}/>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <ServiceFooter/>
        </SafeAreaView>
    );
}
