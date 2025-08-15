import { SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Platform, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Car } from "@/app/CarContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const CarSettings = ({car, setSettings}: {car: Car | undefined, setSettings: Dispatch<SetStateAction<boolean>>}) => {
    const [carName, setCarName] = useState("");

    const handleSubmit = () => {
        console.log("Submitted");
        setSettings(false);
    }

    useEffect(() => {
        console.log(carName)
    }, [carName])

    return (
        <SafeAreaView className="absolute inset-0 justify-center items-center bg-white z-10">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="w-full h-full px-4">
                <View className="flex flex-col w-full rounded-lg">
                    <Text className="self-center text-2xl font-semibold">Car Settings</Text>
                    <TouchableOpacity onPress={() => setSettings(false)} className="p-2 absolute top-0 right-0">
                        <Ionicons name="close" size={20} color="black" />
                    </TouchableOpacity>

                    <View className="flex flex-col justify-between items-center mb-10 mt-6 p-2 gap-6">
                         <View className="flex flex-row items-center border border-gray-300 rounded-lg p-2">
                            <Text className="text-gray-700 w-auto mr-2">Car Name:</Text>
                            <TextInput 
                                className="flex-1 bg-gray-100 p-1 rounded" 
                                value={carName}
                                onChangeText={setCarName}
                                placeholder={car?.name}
                            />
                        </View>
                    </View>
                    <Pressable onPress={handleSubmit} className="self-end w-auto bg-blue-200 p-2 rounded-lg">
                        <Text className="text-sm font-semibold">Submit</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
				</SafeAreaView>
    );
};

export default CarSettings;
