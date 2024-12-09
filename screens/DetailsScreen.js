import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, TextInput, ImageBackground,ToastAndroid,KeyboardAvoidingView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { addToCart } from "../utils/functions";
import { auth, db } from "../firebase";
import { setDoc, doc, collection, addDoc,updateDoc } from "firebase/firestore";

const sizes = ["Small", "Medium", "Large"];

export const DetailsScreen = ({ route }) => {
  const { data } = route.params;
  if(data.text == undefined){
    data.text='';
  }
  const navigation = useNavigation();
  const [selectedSize, setSelectedSize] = useState("Small");
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [TextNotes, setTextNotes] = useState(data.text);

  // console.log("loaded")
  // console.log(data)

  const saveNotes = (text) => {
        const uid = auth.currentUser.uid;
        if (uid === null) return;
        
        if (text.length < 3){
          alert("Notepad is empty");
          return;
        }
        try {
          addDoc(collection(db, "notes_data"), {
            id: data.id,
            uid: uid, 
            text: text,
            time: Date.now()
          }).then((res)=>{
            // // console.log(res)
            // alert("Create new notes Successfully");
            updateDoc(doc(db, "users", uid, "notes", data.id),
              {
                text: text
              }).then(()=>{
              ToastAndroid.show('Notes Saved successfully!', ToastAndroid.SHORT);
              navigation.navigate("Home");
            });

            
          }).catch((error)=>{
            console.error(error.message)
          });
          
        } catch (error) {
          // console.log(error, "Something went wrong");
        }
  };

const handleChange = (text) => {
  setTextNotes(text);
};


  

  

  return (
    <View className="" style={{ flex: 1,backgroundColor: 'orange' }} >
      <View style={{ backgroundColor: "#b76d11", height: 80,elevation: 5,flexDirection: 'row',justifyContent:'space-between',paddingLeft: 10,paddingRight: 10,paddingTop: 30,paddingBottom: 10  }} >
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 5 }} >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
                
              <Text style={{ marginTop: 10 }} >{ data.name }</Text>
              <TouchableOpacity style={{ backgroundColor: '#F194FF',borderRadius: 15,padding: 10,elevation: 3 }} onPress={() => 
                saveNotes(TextNotes)
              }>
                <Text >Save</Text>
              </TouchableOpacity>
      </View>
      <ScrollView  >
      <ImageBackground source={require('../nodepad_c.jpg')} style={{ flex: 1,width: '100%' }} resizeMode="repeat"  >

      <TextInput
          className="px-2"
          style={{ fontSize: 20,lineHeight: 32,height: 2000,textAlignVertical: 'top' }}
          multiline={true}
          onChangeText={(text) => handleChange(text)}
          // numberOfLines={50}
          placeholder="Type Text here...."
          value={TextNotes.toString()}/>

      </ImageBackground>
      </ScrollView>
    </View>
  );
};

// <ScrollView  style={{ backgroundColor: 'red', height: 700 }} >
// </ScrollView>
