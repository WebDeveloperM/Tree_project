import React, {useState, useEffect} from 'react';
import {View, Animated, Easing, Image, Text} from 'react-native';

const Loader = () => {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        startAnimation();
    }, []);

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

    return (
        <>
            <Text className='text-[80px] font-bold text-[#31B44C]'>Tree+1</Text>
            <View className="top-24 overflow-hidden">
                <Animated.View style={[{transform: [{rotate: rotation}]}]}>
                    <Image source={require('../assets/spinner-of-dots.png')}/>
                    {/*<View className='w-14 h-14 rounded-full border-4 border-dotted border-[#31B44C]'></View>*/}
                </Animated.View>
            </View>
        </>
    );
};

export default Loader;