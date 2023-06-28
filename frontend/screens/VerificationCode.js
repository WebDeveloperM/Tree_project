import React, {useEffect, useState} from 'react';
import {Alert, Image, Keyboard, Modal, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import NumberInput from "../components/NumberInput";
import {useNavigation, useRoute} from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LOGIN} from "./utils/urls";
import Timer from '../components/Timer'


export default function VerificationCode({confirm}) {
    const [passwordValue, setPasswordValue] = React.useState({1: '', 2: '', 3: '', 4: ''})
    const [modalVisible, setModalVisible] = useState(false)
    const [open, setOpen] = useState(false)
    const navigation = useNavigation()
    const route = useRoute();
    const {dispatch, phone} = route.params;
    let allPassword = `${passwordValue["1"]}${passwordValue["2"]}${passwordValue["3"]}${passwordValue["4"]}`


    useEffect(() => {
        if (allPassword.length === 4) {
            login()
        }
    }, [passwordValue]);


    const login = async () => {
        try {
            const response = await axios.post(LOGIN, {
                phone: phone,
                dispatch_id: dispatch,
                code: allPassword
            });
            if (!open) {
                setModalVisible(true)
                setOpen(true)
            }
            console.log(response.data.user.type)
            await AsyncStorage.setItem("token", response.data.token)

            setTimeout(() => {
                if (response.data?.user?.type == 1) {
                    navigation.navigate('Home');
                } else {
                    navigation.navigate('Jobs');
                }
                setModalVisible(false)
            }, 1000);
        } catch (error) {
            Alert.alert(error.response.data.detail)
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 items-center bg-white">
                <Modal
                    className='w-full h-full'
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View className='flex-1 items-center justify-center w-full h-full bg-black/50'>
                        <View style={styles.modalView}
                              className='bg-white relative w-3/4 rounded-xl p-5 items-center justify-between'>
                            <Image className='w-60 h-60' source={require('../assets/success.png')}/>
                            <Text className='font-bold text-[20px] mb-10 text-[#31B44C]'>Verification Successful!</Text>
                            <Text className='font-semibold text-[15px] mb-2' onPress={() => {
                                setModalVisible(false)
                            }}>Please wait...</Text>
                            <Text className='font-semibold text-[15px] mb-10'>You will be directed to homepage.</Text>
                        </View>
                    </View>
                </Modal>
                <Text className='text-center text-[25px] font-bold mt-36'>OTP code verification🔐</Text>
                <Text className='w-[80%] px-3 mt-5 mb-16 text-[15px] font-semibold'>
                    We have sent an OTP code to your phone number. Enter the OTP code below
                    to sign in
                </Text>
                <NumberInput
                    confirm={confirm}
                    value={passwordValue}
                    setValue={setPasswordValue}
                />
                <Text className='w-[80%] px-3 mt-14 text-[15px] font-semibold text-center'>
                    Didn't receive code?
                </Text>
                <Timer/>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    modalView: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
});
