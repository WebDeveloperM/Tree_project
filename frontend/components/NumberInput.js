import React, {useState, useRef} from 'react';
import {TextInput, View} from 'react-native';

export default function NumberInput({ value, setValue}) {


    const [firstFocused, setFirstFocused] = useState(false);
    const [secondFocused, setSecondFocused] = useState(false);
    const [thirdFocused, setThirdFocused] = useState(false);
    const [fourthFocused, setFourthFocused] = useState(false);

    const firstInput = useRef()
    const secondInput = useRef()
    const thirdInput = useRef()
    const fourthInput = useRef()

    return (
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
    );
}
