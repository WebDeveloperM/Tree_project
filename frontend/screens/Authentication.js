import React, {useState, useEffect} from 'react';
import {
    Alert,
    Animated, Easing,
    Image, Keyboard, Modal,
    Pressable,
    SafeAreaView, StyleSheet,
    Text,
    View
} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import MaskInput from 'react-native-mask-input';
import NumberInput from "../components/NumberInput";

export default function Authentication() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [confirm, setConfirm] = useState(false)
    const [timer, setTimer] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [passwordValue, setPasswordValue] = React.useState({1: '', 2: '', 3: '', 4: ''})
    const [animation] = useState(new Animated.Value(0));
    const [changed, setChanged] = useState(false)
    const navigation = useNavigation()

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(animation, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const rotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const confirmNumber = () => {
        phoneNumber.length === 14 && setConfirm(true)
        setTimer(60)
    }

    useEffect(() => {
        startAnimation();
    }, []);

    useEffect(() => {
        phoneNumber.length !== 14 && setConfirm(false)
        if (phoneNumber.length === 14) {
            Keyboard.dismiss()
        }
    }, [phoneNumber])

    useEffect(() => {
        if (Object.values(passwordValue).every(Boolean) && !changed) {
            setModalVisible(true)
            setChanged(true)
        }
    }, [passwordValue]);

    return (
        <SafeAreaView className="flex-1 items-center bg-white">
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
                          className='bg-white w-3/4 rounded-xl p-5 items-center justify-between'>
                        <Image className='w-60 h-60' source={require('../assets/success.png')}/>
                        <Text className='font-bold text-[20px] mb-10 text-[#31B44C]'>Verification Successful!</Text>
                        <Text className='font-semibold text-[15px] mb-2' onPress={() => {
                            navigation.navigate('MyWork')
                            setModalVisible(false)
                        }}>Please wait...</Text>
                        <Text className='font-semibold text-[15px] mb-10'>You will be directed to homepage.</Text>
                        <View className="overflow-hidden">
                            <Animated.View style={[{transform: [{rotate: rotation}]}]}>
                                {/*<Image source={require('../assets/spinner-of-dots.png')}/>*/}
                                <View className='w-14 h-14 rounded-full border-4 border-dotted border-[#31B44C]'></View>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </Modal>
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
                {!confirm ?
                    <Pressable onPress={() => confirmNumber()}>
                        <View className='w-80 mt-32 rounded-2xl h-14 bg-[#31B44C] items-center justify-center'>
                            <Text className='font-bold text-[20px] text-white'>Send code</Text>
                        </View>
                    </Pressable> :
                    <NumberInput
                        phoneNumber={phoneNumber}
                        confirm={confirm}
                        timer={timer}
                        setTimer={setTimer}
                        value={passwordValue}
                        setValue={setPasswordValue}
                    />
                }
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
