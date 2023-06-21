import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import InvestorFooter from "../components/InvestorFooter";
import {useNavigation} from "@react-navigation/native";

export default function Order() {
    const navigation = useNavigation()
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View className="w-full h-full items-center">
                    <View
                        className='w-36 h-36 mt-8 border border-[#1B772E] items-center justify-center rounded-full bg-[#D6F0DB]'>
                        <Image className='w-24 h-24' source={require('../assets/tree.png')}/>
                    </View>
                    <Text className='text-[30px] text-[#0AC16D] font-bold mb-10'>Lorem Ipsum</Text>
                    <View className='items-center w-full'>
                        <Pressable onPress={() => navigation.navigate('AddCard')} className='w-[80%]'>
                            <View
                                className='mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                                <View
                                    className='border border-[#1B772E] rounded-2xl w-20 h-20 justify-center items-center bg-white mr-3'>
                                    <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                                </View>
                                <View className=''>
                                    <Text className='text-[30px] font-semibold'>1 piece</Text>
                                </View>
                            </View>
                        </Pressable>
                        <View
                            className='w-[80%] mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                            <View
                                className='border border-[#1B772E] rounded-2xl w-20 h-20 justify-center items-center bg-white mr-3'>
                                <Image className='w-16 h-10' source={require('../assets/trees-5.png')}/>
                            </View>
                            <View className=''>
                                <Text className='text-[30px] font-semibold'>5 piece</Text>
                            </View>
                        </View>
                        <View
                            className='w-[80%] mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                            <View
                                className='border border-[#1B772E] rounded-2xl w-20 h-20 justify-center items-center bg-white mr-3'>
                                <Image className='w-16 h-12' source={require('../assets/trees-20.png')}/>
                            </View>
                            <View className=''>
                                <Text className='text-[30px] font-semibold'>20 piece</Text>
                            </View>
                        </View>
                        <View
                            className='w-[80%] mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                            <View
                                className='border border-[#1B772E] rounded-2xl w-20 h-20 justify-center items-center bg-white mr-3'>
                                <Image className='w-16 h-12' source={require('../assets/tree-count.png')}/>
                            </View>
                            <View className=''>
                                <Text className='text-[30px] font-semibold'>Others</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <InvestorFooter/>
        </SafeAreaView>
    );
}
