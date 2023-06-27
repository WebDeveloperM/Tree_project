import React, {useState} from "react";
import {Alert, Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import {useNavigation} from "@react-navigation/native";

const regions = [
    {key: '1', value: 'Tashkent', label: 'Tashkent'},
    {key: '2', value: 'Andijan region', label: 'Andijan region'},
    {key: '3', value: 'Bukhara region', label: 'Bukhara region'},
    {key: '4', value: 'Fergana region', label: 'Fergana region'},
    {key: '5', value: 'Jizzakh region', label: 'Jizzakh region'},
    {key: '6', value: 'Namangan region', label: 'Namangan region'},
    {key: '7', value: 'Navai region', label: 'Navai region'},
    {key: '8', value: 'Kashkadarya region', label: 'Kashkadarya region'},
    {key: '9', value: 'Samarkand region', label: 'Samarkand region'},
    {key: '10', value: 'Sirdarya region', label: 'Sirdarya region'},
    {key: '11', value: 'Surxondarya region', label: 'Surxondarya region'},
    {key: '12', value: 'Tashkent region', label: 'Tashkent region'},
    {key: '13', value: 'Xorezm region', label: 'Xorezm region'},
]

const userTypes = [
    {key: 1, value: 'Investor', label: 'Investor'},
    {key: 2, value: 'Participant', label: 'Participant'},
]


export default function Information() {
    const [region, setRegion] = React.useState(null)
    const [regionOpen, setRegionOpen] = React.useState(false);
    const [user, setUser] = React.useState(null)
    const [userOpen, setUserOpen] = React.useState(false);
    const navigation = useNavigation()

    const handleContinue = () => {
        if (!region || !user) {
            Alert.alert("Please select a region and user type!");
            return;
        }

        const {key} = userTypes.find(type => type.value === user)
        navigation.navigate('Authentication', {region, key});
    };


    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className="flex-1 items-center justify-evenly w-[80%] mx-auto">
                <Image className='mt-8 mb-4' source={require('../assets/register.png')}/>
                <Text className='text-[35px] font-bold'>Hello there👋</Text>
                <Text className='text-[15px] font-semibold leading-5'>
                    Please enter your phone number. You will
                    receive on OTP code in the next step for the
                    verification process
                </Text>
                <View style={{zIndex: 2}} className='bg-white'>
                    <DropDownPicker
                        className='h-14 bg-[#D6F0DB] rounded-2xl border border-[#1B772E]'
                        textStyle={{fontSize: 20, textAlign: 'center'}}
                        dropDownContainerStyle={{borderColor: '#1B772E', backgroundColor: '#D6F0DB'}}
                        placeholder='Select region'
                        open={regionOpen}
                        value={region}
                        items={regions}
                        setOpen={setRegionOpen}
                        setValue={setRegion}
                    />
                </View>
                <View style={{zIndex: 1}}>
                    <DropDownPicker
                        className='h-14 bg-[#D6F0DB] rounded-2xl border border-[#1B772E] z-10 mb-10'
                        textStyle={{fontSize: 20, textAlign: 'center'}}
                        dropDownContainerStyle={{borderColor: '#1B772E', backgroundColor: '#D6F0DB'}}
                        placeholder='Choose role'
                        open={userOpen}
                        value={user}
                        items={userTypes}
                        setOpen={setUserOpen}
                        setValue={setUser}
                    />
                </View>

                <View className='h-28 pt-12 w-52 flex-row justify-between'>
                    <Pressable onPress={() => navigation.navigate('CommonMap')}>
                        <View
                            className='w-16 h-16 bg-[#D6F0DB] rounded-xl border border-[#1B772E] items-center justify-center'>
                            <Image source={require('../assets/location-icon.png')}/>
                        </View>
                    </Pressable>
                    <Pressable onPress={handleContinue}>
                        <View
                            className='w-16 h-16 bg-[#D6F0DB] rounded-xl border border-[#1B772E] items-center justify-center'>
                            <Image source={require('../assets/arrow-right-icon.png')}/>
                        </View>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}