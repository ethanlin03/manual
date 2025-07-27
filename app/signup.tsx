import { TouchableOpacity, Text, TextInput, View, SafeAreaView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { auth, db } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { serverTimestamp } from "firebase/database";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPass, setConfirmedPass] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmedPassVisibility, setConfirmedPassVisibility] = useState(false);
    const handleVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
        //small bug where turning on and off visibility resets password
    }
    const handleConfirmedVisibility = () => {
        setConfirmedPassVisibility(!confirmedPassVisibility)
    }
    const handleSignup = async () => {
        try {
            const userCreds = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCreds.user

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: serverTimestamp()
            })
            if (userCreds) 
                router.replace('/(tabs)')
        } catch (error: any) {
            console.log("Error:" + error.message)
            alert("Error: " + error.code)
        }
    }
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <View className="flex flex-col p-10 bg-gray-200 justify-center items-center rounded-2xl gap-6 w-[70vw]">
                <Text className="text-2xl font-bold">Create an Account</Text>
                <View className="flex w-full">
                    <Text className="italic text-gray-600 mb-1 text-sm">Email:</Text>
                    <TextInput
                        placeholder="Enter email..."
                        placeholderTextColor="#4b5563"
                        className="p-2 bg-white rounded-lg"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View className="flex w-full">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="italic text-gray-600 text-sm">Password:</Text>
                        <TouchableOpacity className="flex flex-row items-center gap-1 p-1" onPress={handleVisibility}>
                            <Ionicons name="eye" color="#4b5563" size={12}/>
                            <Text className="text-xs">Show</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder="Enter password..."
                        placeholderTextColor="#4b5563"
                        className="p-2 bg-white rounded-lg"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!passwordVisibility}
                    />
                </View>
                <View className="flex w-full">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="italic text-gray-600 text-sm">Confirm password:</Text>
                        <TouchableOpacity className="flex flex-row items-center gap-1 p-1" onPress={handleConfirmedVisibility}>
                            <Ionicons name="eye" color="#4b5563" size={12}/>
                            <Text className="text-xs">Show</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder="Re-enter password..."
                        placeholderTextColor="#4b5563"
                        className="p-2 bg-white rounded-lg"
                        value={confirmedPass}
                        onChangeText={setConfirmedPass}
                        secureTextEntry={!confirmedPassVisibility}
                    />
                </View>
                <View className="flex flex-col w-full gap-1">
                    <TouchableOpacity className="bg-blue-300 py-2 px-4 rounded-lg" onPress={handleSignup}>
                        <Text className="self-center font-semibold">Signup</Text>
                    </TouchableOpacity>
                    <View className="flex flex-row gap-1 justify-center">
                        <Text className="text-sm">Already have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('./login')}>
                            <Text className="text-blue-600 text-sm">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};