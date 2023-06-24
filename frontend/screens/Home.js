import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import InvestorFooter from "../components/InvestorFooter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default function Home() {
    const [orders, setOrders] = useState([])
    const navigation = useNavigation()

    const getMyOrders = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/v1/finance/investor-orders/',
                headers: {
                    'Authorization': `Token ${token}`
                }
            };
            const response = await axios.request(config)
            console.log(response.data);
            setOrders(response.data)
        } catch (error) {
            console.log(error, 'error')
        }
    }

    useEffect(() => {
        getMyOrders()
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View className="w-full h-full items-center">
                    <View className='h-56 w-full bg-gray-400 items-center justify-center'>
                        <Text>view for chart</Text>
                    </View>
                    <Text className='text-[30px] font-semibold my-12'>Wellcome</Text>
                    <View className='items-center w-full'>
                        {orders ?
                            orders.map(order => (
                                <View key={order.id}
                                    className='w-[80%] mb-4 h-24 flex-row items-center bg-[#D6F0DB]/30 p-2 border border-[#1B772E] rounded-2xl'>
                                    <View className='border-2 border-[#1B772E] rounded-2xl p-2 bg-white mr-3'>
                                        <Image className='h-14 w-14' source={require('../assets/tree.png')}/>
                                    </View>
                                    <View className=''>
                                        <Text className='text-[14px] text-[#0AC16D] font-semibold'>The first tree</Text>
                                        <Text className='text-[20px] my-1'>{order.count} tree</Text>
                                        <Text className='text-[12px]'>Lorem ipsum</Text>
                                    </View>
                                    <View className='ml-auto mr-2'>
                                        <Image className='w-12 h-14' source={require('../assets/location-green.png')}/>
                                    </View>
                                </View>
                            ))
                            :
                            <Text>You have not invested yet :(</Text>
                        }
                    </View>
                </View>
            </ScrollView>
            <InvestorFooter/>
        </SafeAreaView>
    );
}
