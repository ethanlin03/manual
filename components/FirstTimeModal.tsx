import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";

type ModalProps = {
    firstTime: boolean;
    setFirstTime: Dispatch<SetStateAction<boolean>>;
};

const FirstTimeModal = ({ firstTime, setFirstTime} : ModalProps) => {
    const [zipCode, setZipCode] = useState("");

    const handleSkip = () => {
        console.log("Skip");
        setFirstTime(false);
    };

    const handleSubmit = () => {
        console.log("Submit");
        setFirstTime(false);
        // need to implement recording of firstTime to false to db
    }

    return (
        <View className="absolute inset-0 bg-black/90 z-50 items-center justify-center">
            <View className="flex flex-col bg-white h-[70vh] w-[95vw] p-4 items-center">
                <View className="flex flex-col items-center gap-2 mb-4">
                    <Text className="font-bold text-2xl">Welcome to Manual!</Text>
                    <Text className="">To get started fill in these fields that will help us recommend nearby shops and prices.</Text>
                </View>
                <View className="flex-1 flex-col items-center gap-4 w-full">
                    <TextInput className="bg-gray-200 rounded-lg w-full p-2" placeholder="What is your zip code?" placeholderTextColor="#888" value={zipCode} onChangeText={setZipCode}/>
                </View>
                <View className="flex flex-col gap-1 items-center w-full">
                    <TouchableOpacity className="bg-blue-200 p-2 rounded-full w-[40%] items-center" onPress={handleSubmit}>
                        <Text className="font-semibold">Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-1" onPress={handleSkip}>
                        <Text className="text-blue-500 font-semibold text-sm">Skip for now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default FirstTimeModal;