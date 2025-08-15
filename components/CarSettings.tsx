import { SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Platform, Pressable } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Car } from "@/app/CarContext";
import { LabeledField } from "./LabeledField";
import { MaintenanceModal } from "./MaintenanceModal";
import { Label } from "@react-navigation/elements";

const CarSettings = ({car, setSettings}: {car: Car | undefined, setSettings: Dispatch<SetStateAction<boolean>>}) => {
    const [carName, setCarName] = useState("");
    const [mileage, setMileage] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [maintenance, setMaintenance] = useState("");
    const [maintenanceModal, setMaintenanceModal] = useState(false);

    const handleSubmit = () => {
        console.log("Submitted");
        setSettings(false);
    }

    const openMaintenanceModal = (desc: string) => {
        setMaintenance(desc);
        setMaintenanceModal(true);
    }

    // maybe include maintenance array or map with maintenance and month/miles

    useEffect(() => {
        console.log(carName)
    }, [carName])

    return (
        <SafeAreaView className="absolute inset-0 justify-center items-center bg-white z-10">
            {maintenanceModal && <MaintenanceModal maintenance={maintenance} setMaintenanceModal={setMaintenanceModal}/>}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="w-full h-full px-4">
                <View className="flex flex-col w-full rounded-lg">
                    <Text className="self-center text-2xl font-semibold">{car?.desc} Settings</Text>
                    <TouchableOpacity onPress={() => setSettings(false)} className="p-2 absolute top-0 right-0">
                        <Ionicons name="close" size={20} color="black" />
                    </TouchableOpacity>

                    <View className="flex flex-col justify-between items-center mb-10 mt-6 p-2 gap-2 border border-gray-300 rounded-lg">
                        <LabeledField fieldDescription="Car Name" inputValue={carName} setInputValue={setCarName} inputPlaceholder={car?.name} />
                        <LabeledField fieldDescription="Mileage" inputValue={mileage} setInputValue={setMileage} inputPlaceholder={car?.mileage} />
                        <LabeledField fieldDescription="License Plate" inputValue={licensePlate} setInputValue={setLicensePlate} inputPlaceholder={car?.name} />
                        <LabeledField fieldDescription="Zip Code" inputValue={licensePlate} setInputValue={setZipCode} inputPlaceholder={car?.name} />
                    </View>
                    <Text className="font-semibold">Maintenance Settings</Text>
                    <View className="flex flex-col justify-between items-center mb-10 mt-6 p-2 gap-2 border border-gray-300 rounded-lg">
                        <TouchableOpacity className="bg-gray-100 rounded-lg w-full p-2" onPress={() => openMaintenanceModal("Oil Change")}>
                            <Text className="mb-1">Oil Change</Text>
                            <Text className="text-sm ">10000 miles | 12 months</Text>
                        </TouchableOpacity>
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
