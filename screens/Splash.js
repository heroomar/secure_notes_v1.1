import {
  View,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";



const Splash = () => {

  const navigation = useNavigation();
 
  // useEffect(() => {
  //   // setTimeout(()=>{
  //   //   navigation.navigate("Login");  
  //   // },5000);
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login"); 
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#b76d11' }}>
      <Image style={{ width: 250, height: 250 }} source = {require('../logo.png')} />
      <Text style={{ fontFamily: 'sans-serif', fontSize: 30 }} >Secure Notes</Text>
    </View>
  );
};

export default Splash;
