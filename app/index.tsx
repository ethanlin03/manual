import { TouchableOpacity, Text, TextInput, View, SafeAreaView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Login from "./login";
import SignUp from "./signup";

export default function App() {
    
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <Login/>
        </SafeAreaView>
    )
};