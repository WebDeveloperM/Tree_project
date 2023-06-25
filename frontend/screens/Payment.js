import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import Button from "../components/common/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {PAYMENTS} from "./utils/urls";


export default function AddCard() {
    const navigation = useNavigation()
    const [count, setCount] = useState(null)
    const route = useRoute()
    const {cardDate, cardNumber} = route.params
    const createOrder = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const headers = {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.post(PAYMENTS, {
                count: Number(count)
            }, {headers});
            console.log(response.data);
            navigation.navigate('Home')
        } catch (error) {
            console.error(error.response.data);
        }
    };

    AsyncStorage.getItem("order").then(r => setCount(r))


    return (
        <View className="flex-1 items-center px-6 py-14 bg-white">
            <View className='w-full flex-row justify-center mb-14'>
                <Pressable onPress={() => navigation.navigate('Order')} className='absolute left-0'>
                    <Image source={require('../assets/arrow-back.png')}/>
                </Pressable>
                <Text className='text-[20px] font-semibold'>Payment</Text>
            </View>
            <View className='w-full bg-[#31B44C] h-56 rounded-2xl py-4 px-6 justify-between'>
                <Image className='w-20 h-10' source={require('../assets/visa.png')}/>
                <View className='flex-row w-[80%] justify-between'>
                    <Text className='text-white text-[18px] font-semibold'>{String(cardNumber).slice(0, 4)}</Text>
                    <Text className='text-white text-[18px] font-semibold'>• • • •</Text>
                    <Text className='text-white text-[18px] font-semibold'>• • • •</Text>
                    <Text className='text-white text-[18px] font-semibold'>{String(cardNumber).slice(-4)}</Text>
                </View>
                <View className='flex-row justify-between w-[90%]'>
                    <View>
                        <Text className='font-semibold text-[12px] text-[#fff]/70 mb-1'>Card holder</Text>
                        <Text className='font-semibold text-[14px] text-white'>Marcus Taylor</Text>
                    </View>
                    <View className='items-end'>
                        <Text className='font-semibold text-[12px] text-[#fff]/70 mb-1'>Expires on</Text>
                        <Text
                            className='font-semibold text-[14px] text-white'>{String(cardDate).slice(0, 2)}/{String(cardDate).slice(2)}</Text>
                    </View>
                </View>
            </View>
            <View className='w-full p-6 my-10'>
                <Text className='font-semibold text-[15px]'>Upcoming dues</Text>
                <View className='flex-row mt-8 justify-between'>
                    <View>
                        <Text className='font-semibold text-[12px] text-black/70 mb-1'>Total Due Amount</Text>
                        <Text className='font-semibold text-[14px] text-black'>15$</Text>
                    </View>
                    <View className='mr-8'>
                        <Text className='font-semibold text-[12px] text-black/70 mb-1'>Total Due Amount</Text>
                        <Text className='font-semibold text-[14px] text-black'>100$</Text>
                    </View>
                </View>
                <View className='flex-row mt-8 justify-between'>
                    <View>
                        <Text className='font-semibold text-[12px] text-black/70 mb-1'>Total Due Amount</Text>
                        <Text className='font-semibold text-[14px] text-black'>15$</Text>
                    </View>
                    <View className='mr-8'>
                        <Text className='font-semibold text-[12px] text-black/70 mb-1'>Total Due Amount</Text>
                        <Text className='font-semibold text-[14px] text-black'>100$</Text>
                    </View>
                </View>
            </View>
            <Pressable onPress={createOrder} className='w-full absolute bottom-10'>
                <Button text={'Pay now'}/>
            </Pressable>
        </View>
    );
}