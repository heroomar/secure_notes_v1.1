import {
  View,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";



const Splash = () => {

  const navigation = useNavigation();
 
  useEffect(() => {
    setTimeout(()=>{
      navigation.navigate("Login");  
    },5000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'darkorange' }}>
      <Image style={{ width: 250, height: 250 }} source = {require('../logo.png')} />
      <Text style={{ fontFamily: 'sans-serif', fontSize: 30 }} >Secure Notes</Text>
    </View>
  );
};

export default Splash;
