import React, {useRef, useState, useEffect} from 'react';
import {
    Animated,
    FlatList,
    Pressable,
    SafeAreaView,
    StatusBar,
    Text,
    useWindowDimensions,
    View
} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Paginator from "../components/Paginator";
import DiscoverItem from "../components/DiscoverItem";
import {slides} from "../slides";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Discover() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const ref = useRef(null)
    const scrollX = useRef(new Animated.Value(0)).current
    const viewableItemChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current
    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current
    const buttonRef = useRef(new Animated.Value(0)).current

    const navigation = useNavigation()
    const {width, height} = useWindowDimensions()


    useEffect(() => {
        if (currentIndex === slides.length - 1) handleStartButton()
    }, [currentIndex])

    useEffect( () => {
        checkToken()

        buttonRef.setValue(1)
    }, []);

    const checkToken = async () => {
        try {
            const value = await AsyncStorage.getItem('user-type');
            if (value !== null) {
                if(value == 1) {
                    navigation.navigate('Home')
                } else {
                    navigation.navigate('Jobs')
                }
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }


    const handleStartButton = () => {
        buttonRef.setValue(0.8)
        Animated.spring(buttonRef, {
            toValue: 1,
            bounciness: 18,
            speed: 10,
            useNativeDriver: true,
        }).start()
    }

    const goNextSlide = () => {
        const nextSlideIndex = currentIndex + 1
        if (nextSlideIndex !== slides.length) {
            const offset = nextSlideIndex * width
            ref?.current?.scrollToOffset({offset})
            setCurrentIndex(nextSlideIndex)
        }
    }

    const skip = () => {
        const lastSlideIndex = slides.length - 1
        const offset = lastSlideIndex * width
        ref?.current?.scrollToOffset({offset})
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-around bg-white">
            <StatusBar backgroundColor={'#fff'}/>
            <FlatList
                ref={ref}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={slides}
                bounces={false}
                contentContainerStyle={{height: height * 0.75}}
                renderItem={({item}) => <DiscoverItem item={item}/>}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                    useNativeDriver: false
                })}
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemChanged}
                viewabilityConfig={viewConfig}
            />
            <View className='flex items-center justify-center mb-6'>
                <Paginator
                    data={slides}
                    scrollX={scrollX}
                />
                {currentIndex === slides.length - 1 ?
                    <Pressable
                        onPress={() => navigation.replace("Information")}
                    >
                        <Animated.View
                            style={{transform: [{scale: buttonRef}]}}
                            className='bg-[#31B44C]/20 px-28 py-4 rounded-2xl'
                        >
                            <Text className='text-[15px] text-[#31B44C] font-bold'>Get started</Text>
                        </Animated.View>
                    </Pressable>
                    :
                    <View className='flex flex-row justify-evenly w-full'>
                        <Pressable
                            onPress={skip}
                            className='bg-[#31B44C]/20 px-12 py-4 rounded-2xl'
                        >
                            <Text className='text-[15px] text-[#31B44C] font-bold'>Skip</Text>
                        </Pressable>
                        <Pressable
                            onPress={goNextSlide}
                            className='bg-[#31B44C] px-12 py-4 rounded-2xl'
                        >
                            <Text className='text-[15px] text-white font-bold'>Next</Text>
                        </Pressable>
                    </View>
                }
            </View>
        </SafeAreaView>
    );
}