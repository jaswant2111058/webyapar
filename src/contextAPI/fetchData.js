import axios from "axios"
import { models } from "../components/modelDetails";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = "https://foodserver-c5lx.onrender.com";



export const fetchHistory = async (username) => {

    try {
        const res = await axios.get(baseURL + "/api/ai/getModelData/" + username.username)
        return res.data.data
    }
    catch (e) {
        console.log({ networkError: e })
    }


}



export const login = async (email,password) => {
    try {

        const res = await axios.post(baseURL + "/auth/user/login", {email,password})

        if (res?.data) {
            const userData = JSON.stringify(res.data);
            await AsyncStorage.setItem('user', userData);
            return res.data
        } else {
            console.error("Login failed:", res.data.error);
        }
    }
    catch (err) {
        console.log(err)
    }
}

export const signup = async (email,username,password) => {
    try {

        const res = await axios.post(baseURL + "/auth/user/signup", {email,username,password})

        if (res?.data) {
            return res.data
        } else {
            console.error("signup failed:", res.data.error);
        }
    }
    catch (err) {
        console.log(err)
    }
}

export const resetPassword = async (credential) => {

    try {
        const res = await axios.post(baseURL + "/api/auth/update-password", credential)
        return res.data
    }
    catch (err) {
        console.log(err)
    }


}


export const getData = async (user) => {
    try {
        const response = await axios.get(`${baseURL}/data`, {
            headers: {
                "Authorization": user.token
            }
        });
        return response.data.content;
    } catch {

    }
};


