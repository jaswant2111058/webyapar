import React, { useRef, useEffect, useState } from 'react';
import { useCameraDevice, useCameraPermission, Camera } from "react-native-vision-camera"
import { StyleSheet, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { useData } from '../dataHooks/hooks';

export default function Form() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const {user, baseURL} = useData()
  const [photoData, setPhoto] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const camera = useRef(null);
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [errorMsg, setErrorMsg] = useState(null);
  const [getRElocation, setREloaction] = useState("init")

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, []);



  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude)
      },
      error => {
        setErrorMsg(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, [getRElocation]);

  const locationFetch = async () =>{

    if(getRElocation === "init"){
      setREloaction("notGrant")
    }
    if(getRElocation === "notGrant")
    {
      setREloaction("granted")
    }
    if(getRElocation === "granted")
    {
      setREloaction("init")
    }
  }

  const upload = async () => {

    if (!latitude || !longitude) {
      Alert.alert("All fields are required")
      return;
    }
    const formData = new FormData();
    formData.append('image', {
      uri: `file://${photoData.path}`,
      type: 'image/jpeg',
      name: 'image.jpg'
    });
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    try {
      const response = await axios.post(`${baseURL}/form`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': user?.token
        }
      });
      Alert.alert("Form Data saved Successfuly")
    } catch (error) {
      console.error(error);
      Alert.alert("Unable to save server error")
    }
  };

  const click = async () => {

    if(!isCameraOn){
      setIsCameraOn(true)
    }
    if (camera.current) {
      const photo = await camera.current.takePhoto()
      setPhoto(photo)
      setIsCameraOn(false)
    }
  }

  const device = useCameraDevice('back')

  return (
    <View style={styles.container}>
      {photoData && !isCameraOn && (
        <Image
          source={{ uri: `file://${photoData.path}` }}
          style={styles.image}
        />
      )}
      {hasPermission && isCameraOn && (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => click()}
        disabled={!hasPermission}
      >
        <Text style={styles.buttonText}>{isCameraOn ? "Capture" :"Retake"}</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.input}
            placeholder='Latitude'
            placeholderTextColor="#878E95"
            onChangeText={(v) => setLatitude(v)}
            value={latitude.toString()} // Convert to string
          />
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.input}
            placeholder='Longitude'
            placeholderTextColor="#878E95"
            onChangeText={(v) => setLongitude(v)}
            value={longitude.toString()} // Convert to string
          />
        </View>
        <TouchableOpacity style={styles.getLocationButton} onPress={() => { locationFetch() }}>
          <Text style={styles.buttonText}>
            {getRElocation === "init" ? "Get Location" : getRElocation === "notGrant" ? "Turn On Location and Refresh" : "Refresh"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={() => upload()}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#0D1525",
    alignItems: "center",
    justifyContent: "center"
  },
  cameraContainer: {
    marginTop:-40,
    height: "50%",
    width: "90%"
  },
  camera: {
    height: "100%",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  captureButton: {
    backgroundColor: "#6CD97E",
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "black"
  },
  inputContainer: {
    alignItems: "center",
  },
  inputWrapper: {
    marginBottom: 20
  },
  label: {
    fontFamily: "Helvetica",
    color: "#DFE2E6",
    marginBottom: 5,
    fontSize: 14
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    borderColor: "#4A5056",
    color: "#F1F3F5",
    fontWeight: "400",
    marginBottom: 10
  },
  getLocationButton: {
    backgroundColor: "#6CD97E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    width: 300,
    marginTop: -15
  },
  image: {
    width: "80%",
    height: "50%",
    marginTop:-40,
  },
  uploadButton: {
    backgroundColor: "#6CD97E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    width: 300,
    marginTop:10
  }
});
