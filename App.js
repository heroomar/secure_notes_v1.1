import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AddNotesScreen from "./screens/AddNotesScreen";
import HomeScreen from "./screens/HomeScreen";
import { TouchableOpacity,Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DetailsScreen } from "./screens/DetailsScreen";
import { handleSignOut } from "./utils/functions";
import Splash from "./screens/Splash.js"; 
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="RegisterScreen"
          component={RegisterScreen}
        />

        

        <Stack.Screen
          options={({ route, navigation }) => ({
            title: "Add New Notes",
            headerShown: true,
            headerStyle: { backgroundColor: "#b76d11" },
          })}
          name="AddNotes"
          component={AddNotesScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route, navigation }) => ({
            title: "",
            headerShown: true,
            headerStyle: { backgroundColor: "#b76d11" },
            
            headerLeft: () => (
              <>
                
                <TouchableOpacity onPress={() => handleSignOut(navigation)}>
                  <Ionicons name="log-out-outline" size={24} color="black" />
                </TouchableOpacity>
              </>
            ),
          })}
        />

        <Stack.Screen
          name="Detail"
          component={DetailsScreen}
          options={({ route, navigation }) => ({
            title: "",
            headerShown: false,
            headerStyle: { backgroundColor: "#b76d11" },
            
          })}
        />

        
      </Stack.Navigator>

      <StatusBar style="light" />
    </NavigationContainer>
  );
}
