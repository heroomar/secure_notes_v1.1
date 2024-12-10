import { View, Text, FlatList, TouchableOpacity, TextInput, Image, Alert, Modal, StyleSheet,Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

//Firebase
import { doc, collection, getDocs, orderBy, query,getAll, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
// import { addToCart } from "../utils/functions";

const HomeScreen = ({ route }) => {
  
  
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Keymodal, setKeyModal] = useState(true);
  const [Id, setId] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [SecKey, setSecKey] = useState("");

   
    const open = (encoded,salt) => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
        return encoded.match(/.{1,2}/g)
          .map(hex => parseInt(hex, 16))
          .map(applySaltToChar)
          .map(charCode => String.fromCharCode(charCode))
          .join('');
    }
  

  const transitionToDetailsScreen = (data) => {
    navigation.push("Detail", {
      data: data,
      SecKey: SecKey
    });
  };

  const deleteNotes = async () => {
    const newData = notes.filter((product) => {
      return product.id !== Id;
    });
    setModalVisible(false)
    setNotes(newData);

    deleteDoc(doc(db, "users", auth.currentUser?.uid, "notes", Id));
  };

  const fetchData = () => {
    
    setLoading(true)
    const uid = auth.currentUser.uid;
        if (uid === null) return;
    getDocs(query(collection(db, "users", uid, "notes"))).then(
      (querySnapshot) => {
        setLoading(false)
        
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        for (let i = 0; i < newData.length; i++) {
          if(newData[i]['text'] != undefined && newData[i]['text'].length > 0){
          let open_text = open(newData[i]['text'],SecKey);
          if(open_text.includes("incryptwithkey")){
            newData[i]['text'] = open_text.replace("incryptwithkey","");
          } else {
            newData[i]['text'] = "invalid Password";
          }
          }
        }
        
        setNotes(newData);
      }
    );
  };

  useEffect(() => {
    
    navigation.addListener('focus', () => { 
          if (!Loading) fetchData();
    });

    navigation.setOptions({ 
      headerRight: () => (
        <>
        <TouchableOpacity style={{ marginRight: 80 }} onPress={() => { setKeyModal(true) }}>
            <Ionicons name="lock-closed-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push("AddNotes")}>
          <Ionicons name="add-outline" size={28} color="black" />
        </TouchableOpacity>
        </>
        
      ),
     })
    
  }, []);


  return (
    <>
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Delete this note?</Text>
              <View style={{ flexDirection: 'row', }} >
                <Pressable
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => deleteNotes()}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={Keymodal}
          onRequestClose={() => {
            setKeyModal(!Keymodal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Secret Key</Text>
              <TextInput
                placeholder="Secret Key"
                placeholderTextColor="gray"
                value={SecKey}
                secureTextEntry={true}
                style={{ backgroundColor: 'white',color: 'black',borderColor: 'grey', marginBottom: 10 }}
                onChangeText={(text) => setSecKey(text)}
                className="w-full justify-center items-center h-14 rounded-3xl border-white border-[1px] text-white px-4"
              />
              <View style={{ flexDirection: 'row', }} >
                
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {setKeyModal(false); fetchData(); }}>
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
    {
      (notes.length == 0)
      ?
      <Text style={{ flex:1, backgroundColor: '#ed782f',fontSize: 20,textAlign: 'center',textAlignVertical: 'center' }} >Start Adding Notes...</Text>
      :
      <></>
    }
    <FlatList
      className="p-4 bg-background"
      data={notes}
      style={{ backgroundColor: '#ed782f' }}
      contentContainerStyle={{ rowGap: 20, paddingBottom: 60 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="relative bg-secondary rounded-2xl overflow-hidden"
          onPress={() => transitionToDetailsScreen(item)}
          style={{ backgroundColor: '#dc8315', borderColor: 'black',borderWidth: 1 }}
        >
          {/* Add button */}
          <TouchableOpacity
            className="p-2 bg-accent rounded-xl absolute right-3 top-3 z-50"
            onPress={() => {
              setModalVisible(true);
              setId(item.id)
              
            }}
          >
            
              
              <Ionicons name="trash-outline" size={24} color="white" />
            
          </TouchableOpacity>

          

          <View className="p-4 gap-y-3">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-white text-xl font-medium">
                {item.name}
              </Text>

              
              <View className="flex-row gap-x-1">
                
              </View>
            </View>

            <Text className="text-gray-500" numberOfLines={2}>
              {item.text}
            </Text>
          </View>
        </TouchableOpacity>

      )}
      
    />
    </>
  );
};



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 25,
    paddingRight: 25
  },
  buttonDelete: {
    backgroundColor: 'red',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default HomeScreen;
