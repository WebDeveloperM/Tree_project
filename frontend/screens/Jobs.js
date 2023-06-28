import React, {useEffect, useState} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import ServiceFooter from "../components/ServiceFooter";
import axios from "axios";
import {GET_JOBS} from "./utils/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Jobs() {
    const [jobs, setJobs] = useState([])

    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            getJobs()
        }, [])
    )

    const getJobs = async () => {
        const token = await AsyncStorage.getItem('token')
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: GET_JOBS,
                headers: {
                    'Authorization': `Token ${token}`,
                },
            };
            const response = await axios.request(config)
            setJobs(response.data)
        } catch (error) {
            console.error(error, "error")
        }
    }

    const logOut = async () => {
        try {
            await AsyncStorage.multiRemove(['token', 'user-type'])
            navigation.replace('Information')
        } catch (error) {
            console.log(error, 'error')
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View className="w-full h-full items-center">
                    <Pressable
                        onPress={logOut}
                        className='absolute top-4 left-6 border border-[#1B772E] rounded-xl py-2 px-4'>
                        <Text className='text-[16px] text-[#1B772E] font-semibold'>Log out</Text>
                    </Pressable>
                    <Text className='text-[30px] font-semibold my-8 '>Jobs</Text>
                    <View className='items-center'>
                        {jobs && jobs.map(job => (
                            <Pressable key={job.id} onPress={() => navigation.navigate('ServiceMap', {job})}>
                                <View
                                    className='w-[90%] mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                                    <View
                                        className='border border-[#1B772E] rounded-2xl w-20 h-20 justify-center items-center bg-white mr-4'>
                                        {job.count < 6 &&
                                            <Image className='h-14 w-14' source={require('../assets/tree.png')}/>}
                                        {5 < job.count && job.count < 30 &&
                                            <Image className='h-10 w-16' source={require('../assets/trees-5.png')}/>}
                                        {job.count > 29 &&
                                            <Image className='h-14 w-16' source={require('../assets/trees-20.png')}/>}
                                    </View>
                                    <View>
                                        <Text className='text-[20px] text-[#0AC16D] font-semibold mb-1'>
                                            {
                                                job.address.split(', ')[1].length > 18 ?
                                                    job.address.split(', ')[1].substring(0, 15) + '...' :
                                                    job.address.split(', ')[1]
                                            }
                                        </Text>
                                        <Text className='text-[20px] text-[#0AC16D] font-semibold mb-1'>
                                            {job.count} piece
                                        </Text>
                                        <Text className='text-[16px]'>{job.amount}$</Text>
                                    </View>
                                    <View className='ml-auto mr-2'>
                                        <Image className='w-14 h-14'
                                               source={require('../assets/backgroundVektor.png')}/>
                                    </View>
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
