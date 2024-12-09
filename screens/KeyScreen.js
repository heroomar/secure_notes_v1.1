import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import * as ImagePicker from "expo-image-picker";
  import { useNavigation } from "@react-navigation/native";
  import getBlobFromUri from "../extensions/getBlobFromUri";
  import Ionicons from "react-native-vector-icons/Ionicons";
  
  // Firebase
  import { auth, db } from "../firebase";
  import { setDoc, doc } from "firebase/firestore";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  //
  
  const KeyScreen = ({ route }) => {
    const { SecKey } = route.params;
    const [_SecKey, _setSecKey] = useState(SecKey);
    const navigation = useNavigation();
    // console.log([SecKey])

    const saveKey = () => {
      navigation.navigate("Home",{ _SecKey: _SecKey });
    };
   
  
    return (
      <KeyboardAvoidingView
        className="justify-center items-center flex-1 bg-background"
        behavior="padding"
        style={{ backgroundColor: '#b76d11' }}
      >
        <View className="w-full items-center gap-5 p-10">
          <TouchableOpacity
            className="w-24 h-24  justify-center items-center overflow-hidden mb-4"
          >
            
              <Image
                source = {require('../logo.png')}
                className="w-full h-full"
              />
            
              {/* <Ionicons name="image-outline" size={28} color="gray" /> */}
            
          </TouchableOpacity>
  
          <TextInput
            placeholder="Secret Key"
            placeholderTextColor="gray"
            value={_SecKey}
            style={{ backgroundColor: 'white',color: 'black' }}
            onChangeText={(text) => _setSecKey(text)}
            className="w-full justify-center items-center h-14 rounded-3xl border-white border-[1px] text-white px-4"
          />
  
          
  
          <TouchableOpacity
            onPress={saveKey}
            className="  w-full justify-center items-center h-14 rounded-3xl border-accent border-[1px]"
            style={{ backgroundColor: 'black' }}
          >
          <Text className="text-white text-lg font-semibold">Save</Text>
          </TouchableOpacity>

          

        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default KeyScreen;
  