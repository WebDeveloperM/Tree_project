import React, {useEffect, useRef, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Camera} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';

export default function ServiceCamera() {
    const [hasCameraAccess, setHasCameraAccess] = useState(null);
    const [image, setImage] = useState(null);
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            await MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraAccess(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const {uri} = await cameraRef.current.takePictureAsync({base64: true});
                setImage(uri);
                console.log(uri)
                uploadImage(uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const convertToJPEG = async (uri) => {
        const jpegUri = `${FileSystem.documentDirectory}image.jpg`;
        await FileSystem.copyAsync({from: uri, to: jpegUri});
        return jpegUri.replace('file://', '');
    };


    const uploadImage = async (uri) => {
        const apiUrl = 'http://127.0.0.1:8000/api/v1/main/orders-done/';
        const jpegUri = await convertToJPEG(uri);
        const token = await AsyncStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.post(apiUrl, {
                order_id: 7,
                plant_id: 107,
                image: "https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg",
            }, {headers});
            navigation.navigate('PhotoConfirmation')
            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error.response.data);
        }
    };


    if (hasCameraAccess === false) {
        return <Text className="text-3xl text-[#999]">No access to camera</Text>;
    }

    return (
        <View className="flex-1 bg-[#31B44C]">
            <Camera className="w-full h-[86%] rounded-b-2xl" ref={cameraRef}/>
            <View className="w-full flex-row items-center justify-between h-20 px-10 ">
                <View
                    className="border border-[#1B772E] rounded-2xl w-14 h-14 justify-center items-center bg-white mr-4">
                    <Image className="h-10 w-10" source={require('../assets/tree.png')}/>
                </View>
                <Pressable onPress={takePicture}>
                    <View className="w-16 h-16 bg-white rounded-full items-center justify-center">
                        <View className="w-10 h-10 bg-[#31B44C] rounded-full"></View>
                    </View>
                </Pressable>
                <View
                    className="border border-[#1B772E] rounded-2xl w-14 h-14 justify-center items-center bg-white mr-4">
                    <Image className="h-10 w-10" source={require('../assets/tree.png')}/>
                </View>
            </View>
        </View>
    );
}
