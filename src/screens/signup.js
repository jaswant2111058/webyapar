import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useData } from '../dataHooks/hooks';
import { signup } from '../contextAPI/fetchData';

export default function SignUp({ navigation }) {
    const { isLoading, startLoading, stopLoading, user } = useData();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setemail] = useState("");


    const handleSignIn = async () => {

        if (!email || !password || !username) {
            Alert.alert("All fields are Required")
            return;
        }
        try {
            startLoading();
            const res = await signup(email, username, password)
            if (res) {
                Alert.alert(res.message)
            }
            else {
                Alert.alert("Server Error")
            }
            navigation.navigate("Login");
        }
        catch {
            Alert.alert("Error in Login try later")
        }
        finally {
            stopLoading();
        }
    };

    return (

        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#CDCDCD" />
                </View>
            ) : (

                <View style={styles.loginMain}>
                    <View style={styles.logoBG}></View>
                    <View style={styles.logo}>
                        <Image
                            style={{ height: 200, width: 200 }}
                            source={require("../assets/images/logo.png")}
                        />
                    </View>
                    <View style={styles.welcome}>
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <View style={styles.nameWrapper}>
                                <Text style={{ fontFamily: "Helvetica", color: "#DFE2E6", marginBottom: 10, fontSize: 14 }}>
                                    User Name
                                </Text>
                                <View style={styles.InputWrapper}>
                                    <TextInput
                                        style={{ fontFamily: "Helvetica", fontSize: 14, color: "#F1F3F5", fontWeight: "400" }}
                                        onChangeText={(value) => { setUsername(value) }}
                                        value={username}
                                        placeholder={"User Name"}
                                        placeholderTextColor={"#F1F3F5"}
                                    />
                                </View>
                            </View>
                            <View style={styles.nameWrapper}>
                                <Text style={{ fontFamily: "Helvetica", color: "#DFE2E6", marginBottom: 10, fontSize: 14 }}>
                                    Email
                                </Text>
                                <View style={styles.InputWrapper}>
                                    <TextInput
                                        style={{ fontSize: 14, color: "#F1F3F5", fontWeight: "400" }}
                                        onChangeText={(value) => { setemail(value) }}
                                        value={email}
                                        placeholder={"Email"}
                                        placeholderTextColor={"#F1F3F5"}
                                    />
                                </View>
                            </View>
                            <View style={styles.nameWrapper}>
                                <Text style={{ fontFamily: "Helvetica", color: "#DFE2E6", marginBottom: 10, fontSize: 14 }}>
                                    Password
                                </Text>
                                <View style={styles.InputWrapper}>
                                    <TextInput
                                        style={{ fontSize: 14, color: "#F1F3F5", fontWeight: "400" }}
                                        onChangeText={(value) => { setPassword(value) }}
                                        value={password}
                                        placeholder={"Pasword"}
                                        placeholderTextColor={"#F1F3F5"}
                                        secureTextEntry={true}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                                handleSignIn()
                            }}>
                                <Text style={{ color: "#0D1525", fontWeight: "700", fontSize: 20 }}>
                                    SignUp
                                </Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }} >
                                <Text style={{ color: "#CDCDCD", fontWeight: "400", fontSize: 14 }}>
                                    Already Have Account{" "}
                                </Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Login")
                                }}>
                                    <Text style={{ color: "#6CD97E", fontWeight: "700", fontSize: 14 }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1525',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginMain: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0D1525',
    },
    logoBG: {
        width: 800,
        height: '40%',
        backgroundColor: '#1B2333',
        transform: [{ rotate: '340deg' }],
        marginLeft: -180,
        marginTop: -90,
    },
    logo: {
        marginTop: -80,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 175,
        height: 175,
        backgroundColor: '#D9D9D9',
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#0D1525',
        fontFamily: 'Helvetica',
        fontSize: 20,
        fontWeight: '700',
    },
    welcome: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 40,
    },
    welcomeText: {
        textAlign: 'center',
        color: '#CDCDCD',
        fontFamily: 'Helvetica',
        fontSize: 22,
        fontWeight: '700',
    },
    InputWrapper: {
        width: 300,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
        borderColor: "#4A5056",
        marginBottom: 20
    },
    loginBtn: {
        backgroundColor: "#6CD97E",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 10

    }
});
