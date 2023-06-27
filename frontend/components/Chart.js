import React, { useState} from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {MAIN_PLANTS} from "../screens/utils/urls";
import {useFocusEffect} from "@react-navigation/native";

const Chart = () => {
    const [data, setData] = useState([
        {key: 'Planted trees', value: 50, svg: {fill: '#31B44C'}},
        {key: 'In process', value: 30, svg: {fill: '#31B44C70'}},
        {key: 'Confirmation your order', value: 20, svg: {fill: '#31B44C40'}},
    ])

    const [done, setDone] = useState(0)
    const [inOrder, setInOrder] = useState(0)
    const [created, setCreated] = useState(0)
    const setValues = (value) => {
        let total = value.total
        setDone(value.results.length * 100 / total)
        setInOrder(value.in_order * 100 / total)
        setCreated(value.created * 100 / total)

        setData([
            ...data,
            data[0].value = done,
            data[1].value = inOrder,
            data[2].value = created
        ])

        console.log(data)
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

    useFocusEffect(
        React.useCallback(() => {
            getData()
        }, [])
    )

    const renderLegend = () => {
        return (
            <>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                    <Text style={{marginRight: 10}}>{done}%</Text>
                    <View style={{width: 10, height: 10, backgroundColor: '#31B44C', marginRight: 5}}/>
                    <Text style={{width: '60%'}}>Planted trees</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                    <Text style={{marginRight: 10}}>{Math.round(inOrder)}%</Text>
                    <View style={{width: 10, height: 10, backgroundColor: '#31B44C70', marginRight: 5}}/>
                    <Text style={{width: '60%'}}>In process</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                    <Text style={{marginRight: 10}}>{Math.round(created)}%</Text>
                    <View style={{width: 10, height: 10, backgroundColor: '#31B44C40', marginRight: 5}}/>
                    <Text style={{width: '60%'}}>Confirmation your order</Text>
                </View>
            </>
        )
        // data.map((item, index) => (
        //     <View key={index} style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
        //         <Text style={{marginRight: 10}}>{item.value}%</Text>
        //         <View style={{width: 10, height: 10, backgroundColor: item.svg.fill, marginRight: 5}}/>
        //         <Text style={{width: '60%'}}>{item.key}</Text>
        //     </View>
        // ));
    };


    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row-reverse',
            padding: 20,
            width: '100%'
        }}>
            <PieChart
                style={{height: 180, width: '50%'}}
                data={data}
                innerRadius={0}
                accessor="value"
                backgroundColor="transparent"
                padAngle={0}
            >
            </PieChart>
            <View style={{width: '50%', marginTop: 20}}>{renderLegend()}</View>
        </View>
    );
};

export default Chart
