import React, {useEffect, useRef, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Camera, CameraType} from "expo-camera";
import * as MediaLibrary from "expo-media-library";


export default function ServiceCamera() {
    const [hasCameraAccess, setHasCameraAccess] = useState(null)
    const [image, setImage] = useState(null)
    // const [type, setType] = useState(Camera.Constants.Type.back)
    // const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null)

    useEffect(() => {
        (async () => {
            await MediaLibrary.requestPermissionsAsync()
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setHasCameraAccess(cameraStatus.status === 'granted')
        })();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync()
                console.log(data)
                setImage(data.uri)
            } catch (error) {
                console.log(error)
            }
        }
    }

    if (hasCameraAccess === false) {
        return <Text className='text-3xl text-[#999]'>No access to camera</Text>
    }

    return (
        <View className="flex-1 bg-[#31B44C]">
            {!image ?
                <Camera
                    className='w-full h-[86%] rounded-b-2xl'
                    // type={type}
                    // flashMode={flash}
                    ref={cameraRef}
                />
                :
                <Image source={{uri: image}} className='w-full h-[86%] rounded-b-2xl'/>
            }
            <View className='w-full flex-row items-center justify-between h-20 px-10 '>
                <View
                    className='border border-[#1B772E] rounded-2xl w-14 h-14 justify-center items-center bg-white mr-4'>
                    <Image className='h-10 w-10' source={require('../assets/tree.png')}/>
                </View>
                <Pressable onPress={takePicture}>
                    <View className='w-16 h-16 bg-white rounded-full items-center justify-center'>
                        <View className='w-10 h-10 bg-[#31B44C] rounded-full'></View>
                    </View>
                </Pressable>
                <View
                    className='border border-[#1B772E] rounded-2xl w-14 h-14 justify-center items-center bg-white mr-4'>
                    <Image className='h-10 w-10' source={require('../assets/tree.png')}/>
                </View>
            </View>
        </View>
    );
}
