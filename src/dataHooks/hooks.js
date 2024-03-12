import React, { createContext, useContext, useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateContext = createContext();

export const useData = () => {
  return useContext(DateContext);
};

export const DataProvider = ({ children }) => {

  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const baseURL = "https://foodserver-c5lx.onrender.com"

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const getSavedData = async () => {
      const data = await AsyncStorage.getItem("user")
      if (data) {
        setUser(JSON.parse(data))
      }
    }
    getSavedData()
  }, [])







  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };


  return (
    <DateContext.Provider value={{
      isLoading,
      startLoading,
      stopLoading,
      isKeyboardVisible,
      setIsKeyboardVisible,
      user,
      setUser,
      baseURL

    }}>
      {children}
    </DateContext.Provider>
  );
};
