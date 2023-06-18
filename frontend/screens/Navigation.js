import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discover from "./Discover";
import {View} from "react-native";
import Loader from "../components/Loader";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const hideHeader = {headerShown: false}
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <View className='flex-1 items-center justify-center bg-white'>
            {isLoading ? <Loader/> : <Discover/>}
        </View>
    );
}