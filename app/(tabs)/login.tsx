import { TouchableOpacity, Text, TextInput, View, SafeAreaView } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const handleVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }
    const handleLogin = () => {

    }
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <View className="flex flex-col p-10 bg-gray-200 justify-center items-center rounded-2xl gap-6 w-[70vw]">
                <Text className="text-2xl font-bold">Login</Text>
                <View className="flex w-full">
                    <Text className="italic text-gray-600 mb-1 text-sm">Username:</Text>
                    <TextInput
                        placeholder="Enter username..."
                        placeholderTextColor="#4b5563"
                        className="p-2 bg-white rounded-lg"
                        value={username}
                        onChangeText={setUsername}
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
                <View className="flex flex-col w-full gap-1">
                    <TouchableOpacity className="bg-blue-300 py-2 px-4 rounded-lg" onPress={handleLogin}>
                        <Text className="self-center font-semibold">Login</Text>
                    </TouchableOpacity>
                    <View className="flex flex-row gap-1 justify-center">
                        <Text className="text-sm">Don't have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('./signup')}>
                            <Text className="text-blue-600 text-sm">Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};