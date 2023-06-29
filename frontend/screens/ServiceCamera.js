import React, {useRef, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Camera} from 'expo-camera';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function ServiceCamera() {
    const [hasCameraAccess, setHasCameraAccess] = useState(null);
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const cameraRef = useRef(null);
    const route = useRoute()
    const {orderId, plantId} = route.params


    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const {uri} = await cameraRef.current.takePictureAsync({base64: true});
                setImage(uri);
                uploadImage(uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const convertToJPEG = async (uri) => {
        const jpegUri = `${FileSystem.documentDirectory}image.jpg`;
        await FileSystem.copyAsync({
            from: uri,
            to: jpegUri,
        });
        return jpegUri;
    };

    const selectImage = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });

            if (!result.canceled) {
                setImage(result.uri);
                uploadImage(result.uri);
            }
        }
    };

    const uploadImage = async (uri) => {
        const jpegUri = await convertToJPEG(uri);
        navigation.navigate('PhotoConfirmation', {
            image: jpegUri,
            setImage: setImage,
            plantId: plantId,
            orderId: orderId
        });
    }

    if (hasCameraAccess === false) {
        return <Text className="text-3xl text-[#999]">No access to camera</Text>;
    }

    return (
        <View className="flex-1 bg-[#31B44C]">
            <Camera className="w-full h-[86%] rounded-b-2xl" ref={cameraRef}/>
            <View className="w-full flex-row items-center justify-between h-20 px-10 ">
                <Pressable onPress={selectImage}>
                    <View
                        className="border border-[#1B772E] rounded-2xl w-14 h-14 justify-center items-center bg-white mr-4"
                    >
                        <Image className="h-10 w-10" source={require('../assets/tree.png')}/>
                    </View>
                </Pressable>
                <Pressable onPress={takePicture}>
                    <View className="w-16 h-16 bg-white rounded-full items-center justify-center">
                        <View className="w-10 h-10 bg-[#31B44C] rounded-full"></View>
                    </View>
                </Pressable>
                <View
                    className="border border-[#1B772E] rounded-2xl w-14 h-14 justify-center items-center bg-white mr-4"
                >
                    <Image className="h-10 w-10" source={require('../assets/tree.png')}/>
                </View>
            </View>
        </View>
    );
}