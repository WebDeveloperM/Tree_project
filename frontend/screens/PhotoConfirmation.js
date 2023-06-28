import React, {useContext, useEffect} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as FileSystem from "expo-file-system";


export default function PhotoConfirmation() {
    const navigation = useNavigation()
    const route = useRoute()
    const {image, setImage} = route.params

    const backToCamera = () => {
        setImage('')
        navigation.navigate('ServiceCamera')
    }

    const uploadImage = async () => {
        const apiUrl = 'http://127.0.0.1:8000/api/v1/main/orders-done/';
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
        };
        try {
            const formData = new FormData();
            formData.append('order_id', '7');
            formData.append('plant_id', '111');
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
