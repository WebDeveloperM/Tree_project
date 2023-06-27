import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';


export default function Test() {
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        setTimer(60)
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    return (
        <>
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
