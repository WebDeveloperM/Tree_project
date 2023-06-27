import React, {useState} from 'react';
import {Alert, Image, Pressable, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import MaskInput from "react-native-mask-input";
import Button from "../components/common/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {ADD_CARD} from "./utils/urls";
import {validateData} from "./utils/validation";


export default function AddCard() {
    const [cardNumber, setCardNumber] = useState('')
    const [cardDate, setCardDate] = useState('')
    const [cardCvv, setCardCvv] = useState('')
    const navigation = useNavigation()
    const addCard = async () => {
        try {
            if (validateData(cardNumber, cardDate, cardCvv)) {
                const token = await AsyncStorage.getItem('token')
                const headers = {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await axios.post(ADD_CARD, {
                    number: cardNumber.replace(/\s+/g, ''),
                    due_date: cardDate.replace('/', '')
                }, {headers});
                console.log(response.data);
                navigation.navigate('Payment',{id:response.data.id})
            }
        } catch (error) {
            console.error(error.response.data);
        }
    };
    return (
        <View className="flex-1 items-center px-6 py-14 bg-white">
            <View className='w-full flex-row justify-between mb-8'>
                <Pressable onPress={() => navigation.navigate('Order')}>
                    <View className='flex-row'>
                        <Image source={require('../assets/arrow-back.png')}/>
                        <Text className='text-[20px] font-semibold ml-2'>Back</Text>
                    </View>
                </Pressable>
                <Text className='text-[20px] font-semibold text-[#31B44C]'>Save</Text>
            </View>
            <View className='w-full mb-12'>
                <Text className='text-[25px] font-semibold text-[#31B44C]'>Add your card</Text>
                <Text className='text-[10px] font-semibold mt-2'>Fill the box below or use your camera phone</Text>
            </View>
            <View className='w-full mb-8'>
                <Text className='text-[12px] font-semibold mb-3'>Your card Number</Text>
                <View
                    className='w-full h-12 bg-[#F3FBF4] border border-[#1B772E]/50 rounded-2xl flex-row items-center p-3'>
                    <Image source={require('../assets/visa.png')}/>
                    <MaskInput
                        keyboardType='numeric'
                        className='text-[15px] ml-10'
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        maxLength={19}
                        // editable={!confirm}
                        // selectTextOnFocus={!confirm}
                        onChangeText={masked => setCardNumber(masked)}
                        mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                        secureTextEntry={false}
                    />
                </View>
            </View>
            <View className='w-full flex-row justify-between mb-8'>
                <View className='w-[45%]'>
                    <Text className='text-[12px] font-semibold mb-3'>Expire date</Text>
                    <View
                        className='w-full h-10 bg-[#F3FBF4] border border-[#1B772E]/50 rounded-2xl items-center p-3'>
                        <MaskInput
                            keyboardType='numeric'
                            className='text-[15px]'
                            placeholder="00/00"
                            value={cardDate}
                            maxLength={5}
                            // editable={!confirm}
                            // selectTextOnFocus={!confirm}
                            onChangeText={masked => setCardDate(masked)}
                            mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                            secureTextEntry={false}
                        />
                    </View>
                </View>
                <View className='w-[45%]'>
                    <Text className='text-[12px] font-semibold mb-3'>CVV number</Text>
                    <View
                        className='w-full h-10 bg-[#F3FBF4] border border-[#1B772E]/50 rounded-2xl items-center p-3'>
                        <MaskInput
                            keyboardType='numeric'
                            className='text-[15px]'
                            placeholder="***"
                            value={cardCvv}
                            maxLength={3}
                            // editable={!confirm}
                            // selectTextOnFocus={!confirm}
                            onChangeText={masked => setCardCvv(masked)}
                            mask={[/\d/, /\d/, /\d/]}
                            secureTextEntry={false}
                        />
                    </View>
                </View>
            </View>
            <View className='w-full'>
                <View
                    className='w-full h-12 bg-[#F3FBF4] border border-[#1B772E]/50 rounded-2xl flex-row items-center
                     relative justify-center p-3'>
                    <Image className='absolute left-6' source={require('../assets/scan-icon.png')}/>
                    <Text className='text-[15px] font-semibold'>Scan card info by camera</Text>
                </View>
            </View>
            <View className='w-full absolute bottom-10'>
                <Pressable onPress={addCard}>
                    <Button text={'Add now'}/>
                </Pressable>
            </View>
        </View>
    );
}
