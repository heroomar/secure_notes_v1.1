import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    ToastAndroid
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import * as ImagePicker from "expo-image-picker";
  import { useNavigation } from "@react-navigation/native";
  import getBlobFromUri from "../extensions/getBlobFromUri";
  import Ionicons from "react-native-vector-icons/Ionicons";
  
  // Firebase
  import { auth, db } from "../firebase";
  import { setDoc, doc, collection, addDoc } from "firebase/firestore";
  
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
  
  const AddNotesScreen = () => {
    
    const navigation = useNavigation();
    const storage = getStorage();
    const [name, setName] = useState("");
    
    
    // useEffect(() => {
     
    // }, []);
  
    const save = () => {
        const uid = auth.currentUser.uid;
        if (uid === null) return;
        // console.log(uid)
        if (name.length < 3){
          alert("Minimum length of notes title is 3 charaters");
          return;
        }
        try {
          addDoc(collection(db, "users", uid,"notes"), {
            name: name,
          }).then((res)=>{
            console.log(res)
            // alert("Create new notes Successfully");
            ToastAndroid.show('Notes created successfully!', ToastAndroid.SHORT);
            navigation.navigate("Home");
          }).catch((error)=>{
            console.error(error.message)
          });
          
        } catch (error) {
          console.log(error, "Something went wrong");
        }
    };
  
    
    return (
      <KeyboardAvoidingView
        className="justify-center items-center flex-1 bg-background"
        behavior="padding"
        style={{ backgroundColor: 'darkorange' }}
      >
        <View className="w-full items-center gap-5 p-10">
          <TouchableOpacity
            className="w-24 h-24  justify-center items-center overflow-hidden mb-4"
          >
            
              <Image
                source = {require('../logo.png')}
                className="w-full h-full"   
              />
            
          </TouchableOpacity>
  
          <TextInput
            placeholder="Name"
            placeholderTextColor="gray"
            value={name}
            style={{ backgroundColor: 'white', color: 'black' }}
            onChangeText={(text) => setName(text)}
            className="w-full justify-center items-center h-14 rounded-3xl border-white border-[1px] text-white px-4"
          />
  
          <TouchableOpacity
            onPress={save}
            className="  w-full justify-center items-center h-14 rounded-3xl border-accent border-[1px]"
            style={{ backgroundColor: 'black' }}
          >
          <Text className="text-white text-lg font-semibold">Add Now</Text>
          </TouchableOpacity>

          

        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default AddNotesScreen;
  