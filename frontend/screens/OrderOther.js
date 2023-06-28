import React, {useState} from 'react';
import {Image, Pressable, Text, TextInput, View} from 'react-native';
import Button from "../components/common/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {GET_CARD} from "./utils/urls";
import {useNavigation} from "@react-navigation/native";


export default function Test() {
    const [count, setCount] = useState('')
    const navigation = useNavigation()

    const getCard = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
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
        <View className="flex-1 items-center justify-evenly bg-white p-10">
            <View className='absolute z-10 top-16 left-6'>
                <Pressable
                    onPress={() => navigation.goBack()}
                    className='p-2 bg-[#31B44C] rounded-xl'
                >
                    <Text className='text-white text-sm font-semibold'>Go back</Text>
                </Pressable>
            </View>
            <Image source={require('../assets/slide-3.png')}/>
            <View className='w-full items-center'>
                <Text className='text-[20px] w-[80%] text-center text-[#0AC16D] font-bold mt-4 mb-6'>Write the amount
                    of
                    trees you want to support</Text>
                <View className='w-full h-12 bg-[#F3FBF4] border border-[#1B772E]/50 rounded-2xl justify-center'>
                    <TextInput
                        className='w-full text-2xl font-semibold mb-1 mx-4'
                        value={count}
                        onChangeText={setCount}
                        placeholder={''}
                    />
                </View>
                <Pressable onPress={() => getCard(count)} className='w-full mt-3'>
                    <Button text={'Order'}/>
                </Pressable>
            </View>
            <Image source={require('../assets/slide-1.png')}/>
        </View>
    );
}
