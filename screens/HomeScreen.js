import { View, Text, FlatList, TouchableOpacity, Image, Alert, Modal, StyleSheet,Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

//Firebase
import { doc, collection, getDocs, orderBy, query,getAll, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { addToCart } from "../utils/functions";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Id, setId] = useState(false);
  const [Loading, setLoading] = useState(false);

  const transitionToDetailsScreen = (data) => {
    navigation.push("Detail", {
      data: data,
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
    console.log('------------------');
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
        // // const refs = newData.map(id => querySnapshot.docs(`notes_data/${id}`))
        // console.log(newData)
        // // getAll(...refs).then(users => console.log(users))
        setNotes(newData);
      }
    );
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      // console.log("reloaded");
      if (!Loading) fetchData();
    });
    // console.log('fething data')
    // fetchData();
  }, []);

  // const _notes=[
  //   {name: 'note',text: 'text'},
  //   {name: 'note',text: 'text'},
  //   {name: 'note',text: 'text'},
  // ];

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
    {
      (notes.length == 0)
      ?
      <Text style={{ flex:1, backgroundColor: 'darkorange',fontSize: 20,textAlign: 'center',textAlignVertical: 'center' }} >Start Adding Notes...</Text>
      :
      <></>
    }
    <FlatList
      className="p-4 bg-background"
      data={notes}
      style={{ backgroundColor: 'darkorange' }}
      contentContainerStyle={{ rowGap: 20, paddingBottom: 60 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="relative bg-secondary rounded-2xl overflow-hidden"
          onPress={() => transitionToDetailsScreen(item)}
          style={{ backgroundColor: 'orange', borderColor: 'black',borderWidth: 1 }}
        >
          {/* Add button */}
          <TouchableOpacity
            className="p-2 bg-accent rounded-xl absolute right-3 top-3 z-50"
            onPress={() => {
              setModalVisible(true);
              setId(item.id)
              // confirm("Are you want to delete this Note?")
              // addToCart(item);
              // setShowCheckMark(true);
              // setTimeout(() => setShowCheckMark(false), 2000);
            }}
          >
            
              {/* <Ionicons name="checkmark" size={24} color="white" /> */}
            
              <Ionicons name="trash-outline" size={24} color="white" />
            
          </TouchableOpacity>

          {/* <Image
            source = {require('../logo.png')}
            style={{ height: 50, width: 50 }}
          /> */}

          <View className="p-4 gap-y-3">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-white text-xl font-medium">
                {item.name}
              </Text>

              {/* Price */}
              <View className="flex-row gap-x-1">
                {/* <Text className="text-accent text-lg">$</Text> */}
                
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
// ListHeaderComponent={() => (
//   <Text className="text-4xl font-semibold text-white">
//     Find the best coffee for you
//   </Text>
// )}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
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
