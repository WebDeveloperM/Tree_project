import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {MAIN_PLANTS} from "../screens/utils/urls";
import {useFocusEffect} from "@react-navigation/native";

const Chart = () => {
    const [data, setData] = useState(null)
    const [done, setDone] = useState(0)
    const [inOrder, setInOrder] = useState(0)
    const [created, setCreated] = useState(0)

    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
    )
    console.log(1)

    const setValues = (value) => {
        let total = value.total
        setDone(value.results.length * 100 / total)
        setInOrder(value.in_order * 100 / total)
        setCreated(value.created * 100 / total)

        setData([
            {key: 1, value: value.results.length * 100 / total, svg: {fill: '#31B44C'}},
            {key: 2, value: value.in_order * 100 / total, svg: {fill: '#31B44C70'}},
            {key: 3, value: value.created * 100 / total, svg: {fill: '#31B44C40'}},
        ])
    }

    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            const headers = {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(MAIN_PLANTS, {headers})
            setValues(response.data)
        } catch (error) {
            console.log(error, 'error')
        }
    }

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row-reverse',
            padding: 20,
            width: '100%'
        }}>
            {data ?
                <PieChart
                    style={{height: 180, width: '50%'}}
                    data={data}
                    innerRadius={0}
                    accessor="value"
                    backgroundColor="transparent"
                    padAngle={0}
                /> : ''
            }
            <View style={{width: '50%', marginTop: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                    <Text style={{marginRight: 5, width: 40}}>{done}%</Text>
                    <View style={{width: 10, height: 10, backgroundColor: '#31B44C', marginRight: 5}}/>
                    <Text style={{width: '60%'}}>Planted trees</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                    <Text style={{marginRight: 5, width: 40}}>{Math.round(inOrder)}%</Text>
                    <View style={{width: 10, height: 10, backgroundColor: '#31B44C70', marginRight: 5}}/>
                    <Text style={{width: '60%'}}>In process</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                    <Text style={{marginRight: 5, width: 40}}>{Math.round(created)}%</Text>
                    <View style={{width: 10, height: 10, backgroundColor: '#31B44C40', marginRight: 5}}/>
                    <Text style={{width: '60%'}}>Confirmation your order</Text>
                </View>
            </View>
        </View>
    );
};

export default Chart
