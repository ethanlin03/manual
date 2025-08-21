import { ScrollView, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Platform, Pressable } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Car } from "@/app/CarContext";
import { LabeledField } from "./LabeledField";
import { MaintenanceModal } from "./MaintenanceModal";

const CarSettings = ({car, setSettings}: {car: Car | undefined, setSettings: Dispatch<SetStateAction<boolean>>}) => {
    const [carName, setCarName] = useState("");
    const [mileage, setMileage] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [maintenance, setMaintenance] = useState("");
    const [notes, setNotes] = useState("");
    const [maintenanceModal, setMaintenanceModal] = useState(false);
    const notesRef = useRef<TextInput>(null);

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

    useEffect(() => {
        console.log("The car's maintenance: ", car?.maintenanceSchedule);
    }, [])

    return (
        <SafeAreaView className="absolute inset-0 justify-center items-center bg-white z-10">
            {maintenanceModal && <MaintenanceModal maintenance={maintenance} setMaintenanceModal={setMaintenanceModal}/>}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="w-full h-full px-4">
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, padding: 16 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
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
                        <View className="flex flex-col justify-between items-center mb-10 mt-2 p-2 gap-2 border border-gray-300 rounded-lg">
                            {car?.maintenanceSchedule.map((maintenance, index) => (
                                <TouchableOpacity key={index} className="bg-gray-100 rounded-lg w-full p-2" onPress={() => openMaintenanceModal(maintenance.type)}>
                                    <Text className="mb-1">{maintenance.type}</Text>
                                    <Text className="text-sm ">{maintenance.miles} miles | {maintenance.adjustedMonths} months</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {/* Issue with notes section due to mulitline */}
                        <Pressable onPress={handleSubmit} className="self-end w-auto bg-blue-200 p-2 rounded-lg">
                            <Text className="text-sm font-semibold">Submit</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CarSettings;
