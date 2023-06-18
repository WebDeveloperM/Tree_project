import React, {useState, useRef, useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';

export default function NumberInput({phoneNumber, confirm, timer, setTimer, value, setValue}) {


    const [firstFocused, setFirstFocused] = useState(false);
    const [secondFocused, setSecondFocused] = useState(false);
    const [thirdFocused, setThirdFocused] = useState(false);
    const [fourthFocused, setFourthFocused] = useState(false);

    const firstInput = useRef()
    const secondInput = useRef()
    const thirdInput = useRef()
    const fourthInput = useRef()

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000)
            return () => clearInterval(interval)
        }
    }, [timer, confirm])
    return (
        <>
            <Text className='w-[80%] px-3 mt-16 text-[15px] font-semibold'>
                We have sent an OTP code to phone number
                +998 {phoneNumber} Enter the OTP code below
                to sign in
            </Text>
            <View className='w-[80%] flex-row justify-around mt-8'>
                <View
                    className={`w-16 h-16 items-center justify-center rounded-2xl ${firstFocused ? 'bg-[#D6F0DB]' : 'bg-[#D6F0DB]/50'}`}>
                    <TextInput
                        className='font-semibold text-[22px]'
                        ref={firstInput}
                        selectionColor={'transparent'}
                        keyboardType='number-pad'
                        maxLength={1}
                        placeholder={'0'}
                        onChangeText={text => {
                            setValue({...value, 1: text})
                            text && secondInput.current.focus()
                        }}
                        onBlur={() => setFirstFocused(false)}
                        onFocus={() => setFirstFocused(true)}
                    />
                </View>
                <View
                    className={`w-16 h-16 items-center justify-center rounded-2xl ${secondFocused ? 'bg-[#D6F0DB]' : 'bg-[#D6F0DB]/50'}`}>
                    <TextInput
                        className='font-semibold text-[22px]'
                        ref={secondInput}
                        selectionColor={'transparent'}
                        keyboardType='number-pad'
                        maxLength={1}
                        placeholder={'0'}
                        onChangeText={text => {
                            setValue({...value, 2: text})
                            text ? thirdInput.current.focus() : firstInput.current.focus()
                        }}
                        onBlur={() => setSecondFocused(false)}
                        onFocus={() => setSecondFocused(true)}
                    />
                </View>
                <View
                    className={`w-16 h-16 items-center justify-center rounded-2xl ${thirdFocused ? 'bg-[#D6F0DB]' : 'bg-[#D6F0DB]/50'}`}>
                    <TextInput
                        className='font-semibold text-[22px]'
                        ref={thirdInput}
                        selectionColor={'transparent'}
                        keyboardType='number-pad'
                        maxLength={1}
                        placeholder={'0'}
                        onChangeText={text => {
                            setValue({...value, 3: text})
                            text ? fourthInput.current.focus() : secondInput.current.focus()
                        }}
                        onBlur={() => setThirdFocused(false)}
                        onFocus={() => setThirdFocused(true)}
                    />
                </View>
                <View
                    className={`w-16 h-16 items-center justify-center rounded-2xl ${fourthFocused ? 'bg-[#D6F0DB]' : 'bg-[#D6F0DB]/50'}`}>
                    <TextInput
                        className='font-semibold text-[22px]'
                        ref={fourthInput}
                        selectionColor={'transparent'}
                        keyboardType='number-pad'
                        maxLength={1}
                        placeholder={'0'}
                        onChangeText={text => {
                            setValue({...value, 4: text})
                            !text && thirdInput.current.focus()
                        }}
                        onBlur={() => setFourthFocused(false)}
                        onFocus={() => setFourthFocused(true)}
                    />
                </View>
            </View>
            <Text className='w-[80%] px-3 mt-4 text-[15px] font-semibold text-center'>
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
        </>
    );
}
