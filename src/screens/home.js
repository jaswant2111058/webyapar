import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Form from './form';
import Data from './data';

export default function Home({ navigation }) {

    const [isForm, setIsform] = useState(true);



    return (
        <View style={styles.container}>
            <View style={styles.historyNavWrapper}>
                <View style={styles.NavWrapper}>
                    <View style={styles.NavMain}>
                        <View style={ isForm ? styles.navBtnInner : null}>
                            <Pressable onPress={() => { setIsform(true) }}>
                                <Text style={isForm ? styles.navText2 : styles.navText}> Upload Data </Text>
                            </Pressable>
                        </View>
                        <View style={!isForm ? styles.navBtnInner : null}>
                            <Pressable onPress={() => { setIsform(false) }}>
                                <Text style={!isForm ? styles.navText2 : styles.navText}> Get Data </Text>
                            </Pressable>
                        </View>
                    </View>
                </View >
            </View>
            {
                isForm? <Form/>:<Data/>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0D1525',
        paddingHorizontal: 10,
    },
    historyNavWrapper: {
        marginTop:5
    },
    navwrapper: {
        width: "100%"
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    NavWrapper: {

        width: "100%",

    },
    NavMain: {
        flexDirection: 'row',
        gap: 10,
        alignItems: "center",
        height: 20,
        paddingHorizontal: 10,

    },
    buttonName: {
        fontSize: 11,
        color: "black",
        fontWeight: "700",
    },
    navBtnInner: {
        borderBottomColor: "#6CD97E",
        borderWidth: 1
    },
    navText: {
        fontSize: 16,
        color: "#CDCDCD",
        fontFamily: "Helvetica",
    },
    navText2: {
        fontSize: 16,
        color: "#6CD97E",
        fontFamily: "Helvetica",
    },

});