import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {ORDER_DONE} from "./utils/urls";


export default function PhotoConfirmation() {
    const navigation = useNavigation()
    const route = useRoute()
    const {image, setImage, orderId, plantId} = route.params
    console.log(orderId, 'orderId')
    console.log(plantId, 'PlantId')

    const backToCamera = () => {
        setImage('')
        navigation.navigate('ServiceCamera')
    }

    const uploadImage = async () => {
        const apiUrl = ORDER_DONE;
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
        };
        try {
            const formData = new FormData();
            formData.append('order_id', orderId);
            formData.append('plant_id', plantId);
            formData.append('image', {
                uri: image,
                name: 'image.jpg',
            });
            const response = await axios.post(apiUrl, formData, {headers});
            navigation.navigate('CompleteJob');
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    return (
        <View className="flex-1 items-center justify-center">
            <Image source={{uri: image}} className='w-full h-[70%]'/>
            <View className='w-full flex-row p-8 justify-between'>
                <Pressable
                    onPress={() => backToCamera()}
                    className='w-[48%] h-14 bg-[#31B44C33] items-center justify-center rounded-2xl'>
                    <Text className='font-bold text-[15px] text-[#31B44C]'>A new</Text>
                </Pressable>
                <Pressable
                    onPress={uploadImage}
                    className='w-[48%] h-14 bg-[#31B44C] items-center justify-center rounded-2xl'>
                    <Text className='font-bold text-[15px] text-white'>Send</Text>
                </Pressable>
            </View>
        </View>
    );
}
