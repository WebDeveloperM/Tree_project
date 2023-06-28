import React, {useState} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import Button from "../components/common/Button";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {GET_ORDERS_DATA} from "./utils/urls";


export default function CompleteJobPhotos() {
    const [ordersData, setOrdersData] = useState(null)

    const navigation = useNavigation()

    const route = useRoute()
    const {id} = route.params


    useFocusEffect(
        React.useCallback(() => {
            getOrdersData()
        }, [])
    )

    const getOrdersData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.post(GET_ORDERS_DATA, {
                    order_id: id
                }, {headers})
            ;
            console.log(response.data)
            setOrdersData(response.data);
        } catch (error) {
            console.log(error.response.data, 'errorr');
        }
    };

    let a = ordersData?.plants.map(item => console.log(item.image))

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>
                <View className="w-full h-full items-center p-10">
                    <View className='flex-row flex-wrap justify-between'>
                        {ordersData && ordersData.plants.map(item => (
                            <Pressable
                                key={item.id}
                                onPress={() => navigation.navigate('ServiceCamera', {plantId: item.id, orderId: id})}
                                className='w-[48%] h-36 border border-[#1B772E] rounded-2xl items-center justify-center mb-4'>
                                {item.image ? <Image source={{uri: `http://127.0.0.1:8000${item.image}`}}/> :
                                    <Image source={require('../assets/camera-icon-2.png')}/>}

                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <Pressable
                onPress={() => navigation.navigate('Jobs')}
                className='w-full absolute bottom-0 p-10'>
                <Button text={'Complete'}/>
            </Pressable>
        </SafeAreaView>
    );
}
