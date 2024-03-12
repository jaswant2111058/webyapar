import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Alert, Image, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native"
import { getData } from '../contextAPI/fetchData';
import { useData } from '../dataHooks/hooks';

export default function Data() {

    const { user, baseURL } = useData()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await getData(user);
            setData(res);
        };
        fetchData();
    }, [user]);






    return (
        <View style={styles.container}>
            <ScrollView>
                {data.map((item, index) => {

                    return (
                        <>

                            <View style={{ marginTop:15, width: "100%", borderWidth: 1, borderColor: "#6CD97E", alignItems: "center", borderRadius: 10, flexDirection: 'row', gap: 20, padding: 10 }} key={item._id}>
                                <Image
                                    key={`${item._id + (index + 1)}`}
                                    source={{ uri: `${baseURL}/img/${item.imageUrl}` }}
                                    style={styles.image}
                                />
                                <View style={{}} key={`${item._id + (index + 2)}`}>
                                    <Text style={{ color: "#CDCDCD", fontSize: 16 }} key={`${item._id + (index + 3)}`}>
                                        Latitude : {item.latitude}
                                    </Text>
                                    <Text style={{ color: "#CDCDCD", fontSize: 16 }} key={`${item._id + (index + 4)}`}>
                                        Logitude : {item.longitude}
                                    </Text>
                                </View>
                            </View>

                        </>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },

    image: {
        width: 70,
        height: 70,
    },

});
