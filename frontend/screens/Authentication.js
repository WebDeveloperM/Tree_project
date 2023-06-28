import React, {useState, useEffect} from 'react';
import {
    Alert,
    Image, Keyboard,
    Pressable,
    SafeAreaView,
    Text,
    View
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import MaskInput from 'react-native-mask-input';
import axios from "axios";
import {REGISTER} from "./utils/urls";
import {useRoute} from "@react-navigation/native";
import Button from "../components/common/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Authentication() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirm, setConfirm] = useState(false)
    const route = useRoute();
    const {region, key} = route.params;

    const navigation = useNavigation()

    const confirmNumber = async () => {
        if (phoneNumber.length === 14) {
            setConfirm(true)
            try {
                const stringKey = String(key);
                await AsyncStorage.setItem('user-type', stringKey);

                const registerResponse = await axios.post(REGISTER, {
                    phone: `998${phoneNumber.replace(/\D/g, '')}`,
                    region: region,
                    type: key
                });
                const dispatch = registerResponse.data.dispatch_id;
                const phone = registerResponse.data.phone;
                navigation.navigate('VerificationCode', {confirm, dispatch, phone})
            } catch (error) {
                console.log(error.response)
            }
        } else {
            Alert.alert('Phone number should be 12 numbers')
        }
    };

    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <View className='w-full h-[90%] items-center '>
                <Image className='mt-16' source={require('../assets/verification.png')}/>
                <Text className='text-center text-[25px] font-bold mt-8 mb-4'>OTP code verification🔐</Text>
                <View className='w-[80%]'>
                    <Text className='text-[14px] font-bold m-3'>Phone number</Text>
                    <View className='flex-row h-14 p-2 border-b-2 border-b-[#31B44C]'>
                        <View className='flex-row items-center'>
                            <Image className='w-6 h-6 rounded-full mr-2' source={require('../assets/uzb.png')}/>
                            <Text className='text-[26px]'>+998 </Text>
                        </View>
                        <MaskInput
                            keyboardType='numeric'
                            className='text-[26px]'
                            placeholder="(00) 000-00-00"
                            value={phoneNumber}
                            maxLength={14}
                            editable={!confirm}
                            selectTextOnFocus={!confirm}
                            onChangeText={masked => setPhoneNumber(masked)}
                            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            secureTextEntry={false}
                        />
                    </View>
                </View>
                <Pressable onPress={confirmNumber}>
                    <View className='w-80 mt-36'>
                        <Button text={'Send code'}/>
                    </View>
                </Pressable>
            </View>
            <View className='flex-row w-80 items-center'>
                <Image source={require('../assets/accept-icon.png')}/>
                <Text className='text-[10px] font-semibold w-56 ml-3'>
                    I agree to EVPoint <Text className='text-[#31B44C]'>Public Agreement, Farmi,
                    Privacy Policy</Text>, and confirm that I am over 17
                    years old.
                </Text>
            </View>
        </SafeAreaView>
    );
}
