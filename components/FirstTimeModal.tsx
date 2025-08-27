import { db } from "@/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, Switch, SafeAreaView, TextInput, TouchableOpacity } from "react-native";

type ModalProps = {
    firstTime: boolean;
    setFirstTime: Dispatch<SetStateAction<boolean>>;
    userId: string;
};

const FirstTimeModal = ({ firstTime, setFirstTime, userId} : ModalProps) => {
    const [zipCode, setZipCode] = useState("");
    const [units, setUnits] = useState<"miles" | "km">("miles");
    const [notifications, setNotifications] = useState(true);

    const handleSkip = () => {
        console.log("Skip");
        setFirstTime(false);
    };

    const handleSubmit = async () => {
        if(zipCode.length !== 5 || isNaN(Number(zipCode))) {
            alert("Enter a valid zip code!");
            return;
        }
        console.log("Submit");
        console.log({zipCode, units, notifications});
        try {
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, {
                firstTime: false,
                zipCode: zipCode,
                units: units,
                notifications: notifications,
            });
            setFirstTime(false);
        } catch (error) {
            alert("Couldn't submit preferences!");
            return;
        }
    }

    return (
        <View className="absolute inset-0 bg-black/90 z-50 items-center justify-center">
            <View className="flex flex-col rounded-lg bg-white h-[70vh] w-[95vw] p-4 items-center">
                <View className="flex flex-col items-center gap-2 mb-4">
                    <Text className="font-bold text-2xl">Welcome to Manual!</Text>
                    <Text className="">Let's get started with setting up a few things that will help us recommend the shops and create a tailored experience.</Text>
                </View>
                <View className="flex-1 flex-col items-center gap-8 w-full">
                    <View className="w-full p-1">
                        <Text className="mb-1 ml-1 italic">Zip Code:</Text>
                        <TextInput
                            className="bg-gray-200 rounded-lg w-full p-2"
                            placeholder="What is your zip code?"
                            placeholderTextColor="#888" value={zipCode}
                            onChangeText={setZipCode}
                        />
                    </View>
                    <View className="w-full p-1">
                        <Text className="mb-1 ml-1 italic">Preferred Units:</Text>
                        <View className="flex flex-row gap-4 w-full">
                            <TouchableOpacity className={`${units === "miles" ? `bg-blue-200` : `bg-gray-200`} rounded-lg p-2 flex-1 items-center`} onPress={() => setUnits("miles")}>
                                <Text>Miles</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className={`${units === "km" ? `bg-blue-200` : `bg-gray-200`} rounded-lg p-2 flex-1 items-center`} onPress={() => setUnits("km")}>
                                <Text>Kilometers</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="font-semibold italic mr-2">Enable Maintenance Reminders:</Text>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{ false: "#ccc", true: "#60a5fa" }}
                            thumbColor={notifications ? "#2563eb" : "#f4f3f4"}
                        />
                    </View>
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