import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Discover from "./screens/Discover";
import Authentication from "./screens/Authentication";
import Information from "./screens/Information";
import Navigation from "./screens/Navigation";
import Home from "./screens/Home";

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
                <Stack.Screen name="Home" component={Home} options={hideHeader}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}