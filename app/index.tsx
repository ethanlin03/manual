import { TouchableOpacity, Text, TextInput, View, SafeAreaView } from "react-native";
import { useState, useContext, createContext, useReducer } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth } from "@/FirebaseConfig";
import Login from "./login";
import UserProvider from "./UserContext";

export default function App() {
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <Login/>
        </SafeAreaView>
    )
};