import React from 'react';
import { Text, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";


export default function Home() {
    const navigation = useNavigation()

    return (
        <View className="flex-1 items-center justify-center">
            <Text className='text-4xl' onPress={()=> navigation.navigate('Authentication')}>Home</Text>
        </View>
    );
}
