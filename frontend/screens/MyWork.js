import React, {useState} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import ServiceFooter from "../components/ServiceFooter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {GET_MY_WORK} from "./utils/urls";


export default function MyWork() {
    const [myWork, setMyWork] = useState(null)

    const navigation = useNavigation()


    useFocusEffect(
        React.useCallback(() => {
            getMyWork()
        }, [])
    )

    const getMyWork = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const headers = {
                Authorization: `Token ${token}`,
                'Content-Type': ' application/json',
            };
            const response = await axios.get(GET_MY_WORK, {headers})
            setMyWork(response.data)
        } catch (error) {
            console.log(error, 'error')
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View className="w-full h-full items-center">
                    <Text className='text-[30px] font-semibold my-8 '>My work</Text>
                    <View className='items-center'>
                        {myWork && myWork.map(item => (
                            <Pressable
                                key={item.id}
                                onPress={() => navigation.navigate('CompleteJobPhotos', {id: item.id})}
                                className='w-[80%] mb-10 flex-row items-center bg-[#D6F0DB]/30 px-2 py-3 border border-[#1B772E] rounded-2xl'>
                                <View className='mr-2'>
                                    <Image className='w-12 h-14' source={require('../assets/location-green.png')}/>
                                </View>
                                <View className=''>
                                    <Text className='text-[17px] text-[#0AC16D] font-semibold w-[70%]'>{item.address.substring(0,20)}...</Text>
                                    <View className='flex-row items-center mt-2'>
                                        <Text className='text-[17px] mr-2'>{item.count} piece</Text>
                                        <View
                                            className='h-5 w-20 bg-[#31B44C]/20 items-center justify-center rounded-full'>
                                            <Text className='text-[14px] font-bold text-[#31B44C]'>Get it</Text>
                                        </View>
                                    </View>
                                </View>
                                <View className='ml-auto mr-2'>
                                    <Image className='w-12 h-12' source={require('../assets/backgroundVektor.png')}/>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <ServiceFooter/>
        </SafeAreaView>
    );
}
