import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discover from "./screens/Discover";
import Authentication from "./screens/Authentication";
import Information from "./screens/Information";
import Navigation from "./screens/Navigation";
import Home from "./screens/Home";
import Jobs from "./screens/Jobs";
import MyWork from "./screens/MyWork";
import Order from "./screens/Order";
import VerificationCode from "./screens/VerificationCode";
import AddCard from "./screens/AddCard";
import Payment from "./screens/Payment";
import ServiceMap from "./screens/ServiceMap";
import ServiceCamera from "./screens/ServiceCamera";
import CompleteJob from "./screens/CompleteJob";
import CompleteJobPhotos from "./screens/CompleteJobPhotos";
import PhotoConfirmation from "./screens/PhotoConfirmation";

const Stack = createNativeStackNavigator();

export default function App() {
    const hideHeader = {headerShown: false}

    return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Navigation" component={Navigation} options={hideHeader}/>
                    <Stack.Screen name="Discover" component={Discover} options={hideHeader}/>
                    <Stack.Screen name="Information" component={Information} options={hideHeader}/>
                    <Stack.Screen name="Authentication" component={Authentication} options={hideHeader}/>
                    <Stack.Screen name="VerificationCode" component={VerificationCode} options={hideHeader}/>
                    <Stack.Screen name="Home" component={Home} options={hideHeader}/>
                    <Stack.Screen name="Jobs" component={Jobs} options={hideHeader}/>
                    <Stack.Screen name="MyWork" component={MyWork} options={hideHeader}/>
                    <Stack.Screen name="Order" component={Order} options={hideHeader}/>
                    <Stack.Screen name="AddCard" component={AddCard} options={hideHeader}/>
                    <Stack.Screen name="Payment" component={Payment} options={hideHeader}/>
                    <Stack.Screen name="ServiceMap" component={ServiceMap} options={hideHeader}/>
                    <Stack.Screen name="ServiceCamera" component={ServiceCamera} options={hideHeader}/>
                    <Stack.Screen name="CompleteJob" component={CompleteJob} options={hideHeader}/>
                    <Stack.Screen name="CompleteJobPhotos" component={CompleteJobPhotos} options={hideHeader}/>
                    <Stack.Screen name="PhotoConfirmation" component={PhotoConfirmation} options={hideHeader}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}