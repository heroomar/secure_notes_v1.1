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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  

  const navigation = useNavigation();
  const storage = getStorage();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        
      })
      .catch((error) => alert(error.message));
  };

  const uploadDataToFirestore = async (user) => {
    const filename = image.substring(image.lastIndexOf("/") + 1);
    const imageBlob = await getBlobFromUri(image);
    const storageRef = ref(storage, `users/${user.uid}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, imageBlob);

  };

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // console.log(res)
      })
      .catch((error) => alert(error.message));
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
          
          onPress={pickImage}
        >
          
            <Image
              source = {require('../logo.png')}
              className="w-full h-full"
              
            />
          
        </TouchableOpacity>

        <TextInput
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          style={{ backgroundColor: 'white', color: 'black' }}
          onChangeText={(text) => setEmail(text)}
          className="w-full justify-center items-center h-14 rounded-3xl border-white border-[1px] text-white px-4"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
          style={{ backgroundColor: 'white', color: 'black' }}
          onChangeText={(text) => setPassword(text)}
          className="w-full justify-center items-center h-14 rounded-3xl border-white border-[1px] text-white px-4 mb-4"
        />

        

        <TouchableOpacity
          onPress={loginUser}
          className=" w-full justify-center items-center h-14 rounded-3xl border-accent border-[1px]"
          style={{ backgroundColor: 'black' }}
        >
          <Text className="text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>{navigation.navigate("RegisterScreen")}}
          className="justify-center items-center h-14 rounded-3xl"
        >
          <Text className="text-white text-lg font-semibold">Register</Text>
        </TouchableOpacity>


      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
