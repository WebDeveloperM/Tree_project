import React, {useEffect, useState} from 'react';
import {Alert, Animated, Easing, Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import NumberInput from "../components/NumberInput";
import {useNavigation} from "@react-navigation/native";


export default function VerificationCode({confirm}) {
    const [passwordValue, setPasswordValue] = React.useState({1: '', 2: '', 3: '', 4: ''})
    const [timer, setTimer] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [open,setOpen] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        setTimer(60)
    }, []);

    useEffect(() => {
        if (Object.values(passwordValue).every(Boolean) && !open) {
            setModalVisible(true)
            setOpen(true)
        }
    }, [passwordValue]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000)
            return () => clearInterval(interval)
        }
    }, [timer, confirm])


    return (
        <View className="flex-1 items-center">
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
                            navigation.navigate('Home')
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
                timer={timer}
                setTimer={setTimer}
                value={passwordValue}
                setValue={setPasswordValue}
            />
            <Text className='w-[80%] px-3 mt-14 text-[15px] font-semibold text-center'>
                Didn't receive code?
            </Text>
            {timer !== 0 ?
                <Text className='w-[80%] px-3 mt-4 text-[15px] font-semibold text-center'>
                    You can resend code code in <Text className='text-[#31B44C]'>{timer}</Text> s
                </Text>
                :
                <Text
                    onPress={() => setTimer(60)}
                    className='w-[80%] px-3 mt-4 text-[15px] font-semibold text-center text-[#31B44C]'
                >
                    Resend code
                </Text>
            }
        </View>
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
