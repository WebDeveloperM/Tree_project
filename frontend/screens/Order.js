import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import InvestorFooter from "../components/InvestorFooter";
import {useNavigation} from "@react-navigation/native";
import axios from 'axios';
import {GET_CARD} from "./utils/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Order() {
    const navigation = useNavigation()

    const getCard = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token')
            const headers = {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(GET_CARD, {headers})
            AsyncStorage.setItem('order', id.toString())
            console.log(response.data)
            if (response.data.length === 0) {
                navigation.navigate('AddCard')
            } else {
                navigation.navigate('Payment', {
                    cardDate: response.data[0].due_date,
                    cardNumber: response.data[0].number
                })
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View className="w-full h-full items-center">
                    <View
                        className='w-36 h-36 mt-4 border border-[#1B772E] items-center justify-center rounded-full bg-[#D6F0DB]'>
                        <Image className='w-24 h-24' source={require('../assets/tree.png')}/>
                    </View>
                    <Text className='text-[20px] w-[70%] text-center text-[#0AC16D] font-bold mt-4 mb-6'>Choose the amount of trees you want to support</Text>
                    <View className='items-center w-full'>
                        <Pressable onPress={() => getCard(1)} className='w-[80%]'>
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
                        <Pressable onPress={() => getCard(5)} className='w-[80%]'>
                            <View
                                className='mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                                <View
                                    className='border border-[#1B772E] rounded-2xl w-20 h-20 justify-center items-center bg-white mr-3'>
                                    <Image className='h-10 w-16' source={require('../assets/trees-5.png')}/>
                                </View>
                                <View className=''>
                                    <Text className='text-[30px] font-semibold'>5 piece</Text>
                                </View>
                            </View>
                        </Pressable>
                        <Pressable onPress={() => getCard(20)} className='w-[80%]'>
                            <View
                                className='mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                                <View
                                    className='border border-[#1B772E] rounded-2xl w-20 h-20 justify-center items-center bg-white mr-3'>
                                    <Image className='h-14 w-16' source={require('../assets/trees-20.png')}/>
                                </View>
                                <View className=''>
                                    <Text className='text-[30px] font-semibold'>20 piece</Text>
                                </View>
                            </View>
                        </Pressable>
                        <Pressable className='w-[80%]' onPress={()=> navigation.navigate('OrderOther')}>
                            <View
                                className='mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                                <View
                                    className='border border-[#1B772E] rounded-2xl w-20 h-20 justify-center items-center bg-white mr-3'>
                                    <Image className='h-12 w-16' source={require('../assets/tree-count.png')}/>
                                </View>
                                <View className=''>
                                    <Text className='text-[30px] font-semibold'>Other</Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <InvestorFooter/>
        </SafeAreaView>
    );
}
