import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AddNotesScreen from "./screens/AddNotesScreen";
import HomeScreen from "./screens/HomeScreen";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DetailsScreen } from "./screens/DetailsScreen";
import { handleSignOut } from "./utils/functions";
import { CartScreen } from "./screens/CartScreen";
import Splash from "./screens/Splash.js"; 
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
          options={{ headerShown: false }}
          name="AddNotes"
          component={AddNotesScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ route, navigation }) => ({
            title: "",
            headerShown: true,
            headerStyle: { backgroundColor: "darkorange" },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.push("AddNotes")}>
                <Ionicons name="add-outline" size={28} color="black" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => handleSignOut(navigation)}>
                <Ionicons name="log-out-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Detail"
          component={DetailsScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

      <StatusBar style="light" />
    </NavigationContainer>
  );
}
