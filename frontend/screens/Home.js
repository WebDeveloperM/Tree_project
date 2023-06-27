import React, {useState} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import InvestorFooter from "../components/InvestorFooter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Chart from "../components/Chart";
import {INVESTOR_ORDERS} from "./utils/urls";


export default function Home() {
    const [orders, setOrders] = useState([])
    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            getMyOrders()
        }, [])
    )

    const getMyOrders = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const headers = {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(INVESTOR_ORDERS, {headers})
            // console.log(response.data);
            setOrders(response.data)
        } catch (error) {
            console.log(error, 'error')
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

    return (<SafeAreaView className="flex-1 bg-white">
        <ScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
            <View className="w-full h-full items-center">
                <Pressable
                    onPress={logOut}
                    className='absolute top-3 left-4 border border-[#1B772E] rounded py-2 px-3 z-10 bg-white'>
                    <Text className='text-[12px] text-[#1B772E] font-semibold'>Log out</Text>
                </Pressable>
                {orders.length ? <View className='mt-8 w-full items-center justify-center'>
                    <Chart/>
                </View> : ''}
                <Text className='text-[30px] font-semibold my-12'>Wellcome</Text>
                <View className='items-center w-full'>
                    {orders.length ? orders.map(order => (
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
                            </View>))
                        :
                        <View className='w-[80%] bg-[#D6F0DB] h-10 rounded-xl items-center justify-center'>
                            <Text>You have not invested yet</Text>
                        </View>
                    }
                </View>
            </View>
        </ScrollView>
        <InvestorFooter/>
    </SafeAreaView>);
}
