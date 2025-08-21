import { ScrollView, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Platform, Pressable } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState, useRef, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Car, CarContext, Maintenance_Item } from "@/app/CarContext";
import LabeledField from "./LabeledField";
import MaintenanceModal from "./MaintenanceModal";
import AlertModal from "./AlertModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import { UserContext } from "@/app/UserContext";

const CarSettings = ({car, setSettings}: {car: Car | undefined, setSettings: Dispatch<SetStateAction<boolean>>}) => {
    const [carName, setCarName] = useState("");
    const [mileage, setMileage] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [maintenance, setMaintenance] = useState("");
    const [allMaintenances, setAllMaintenances] = useState(car?.maintenanceSchedule);
    const [notes, setNotes] = useState("");
    const [maintenanceModal, setMaintenanceModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [miles, setMiles] = useState(0);
    const [months, setMonths] = useState(0);
    const [userId, setUserId] = useContext(UserContext);
    const [userCars, setUserCars] = useContext(CarContext);

    const handleSubmit = async () => {
        // description needs to be replaced completely with year, make, model and move zipcode to user profile
        // currently doesn't update maintenance schedule and needs to update it from maintenance modal
        // need to have placeholders for license plate and zipcode right
        // need to update car settings and car id page after update (display right oil change miles etc.)
        try {
            const userCarRef = doc(db, "cars", userId);
            const updatedCars = userCars.map((c) => {
                if (c.name === car?.name) {
                    return {
                        ...c,
                        name: carName.trim() !== "" ? carName : c.name || "Unnamed Car",
                        mileage: mileage.trim() !== "" ? mileage : c.mileage || 0,
                        licensePlate: licensePlate.trim() !== "" ? licensePlate : "empty",
                        zipCode: zipCode.trim() !== "" ? zipCode : "empty",
                        maintenanceSchedule: allMaintenances
                    };
                }
                return c;
            });

            console.log("Updated cars are: ", updatedCars);

            await updateDoc(userCarRef, {
                cars: updatedCars
            });

            setSettings(false);
            console.log("Car updated successfully");
        } catch (error) {
            console.error("Error updating car:", error);
        }
    }

    const updateMaintenance = (type: string, newMiles: number, newMonths: number) => {
        if(!car) return;

        const updatedMaintenances = allMaintenances?.map((m) => {
            if(m.type === type) {
                return {
                    ...m,
                    miles: newMiles,
                    adjustedMonths: newMonths,
                }
            }
            return m;
        })
        setMiles(0);
        setMonths(0);
        setAllMaintenances(updatedMaintenances);
    };

    const handleClose = () => {
        if(miles !== 0 || months !== 0 || carName.length !== 0 || mileage.length !== 0 || zipCode.length !== 0 || licensePlate.length !== 0) {
            setAlertModal(true);
            return;
        }
        setSettings(false);
    };

    const openMaintenanceModal = (desc: string, adjustedMonths: number, miles: number) => {
        setMaintenance(desc);
        setMonths(adjustedMonths);
        setMiles(miles);
        setMaintenanceModal(true);
    }

    // maybe include maintenance array or map with maintenance and month/miles

    useEffect(() => {
        console.log(miles)
    }, [miles])

    return (
        <SafeAreaView className="absolute inset-0 justify-center items-center bg-white z-10">
            { alertModal && <AlertModal handleGoBack={() => setAlertModal(false)} handleLeave={() => setSettings(false)} /> }
            { maintenanceModal && <MaintenanceModal maintenance={maintenance} setMaintenanceModal={setMaintenanceModal} months={months} setMonths={setMonths} miles={miles} setMiles={setMiles} updateMaintenance={updateMaintenance} /> }
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="w-full h-full px-4">
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, padding: 16 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex flex-col w-full rounded-lg">
                        <Text className="self-center text-2xl font-semibold">{car?.year} {car?.make} {car?.model} Settings</Text>
                        <TouchableOpacity onPress={handleClose} className="p-2 absolute top-0 right-0">
                            <Ionicons name="close" size={20} color="black" />
                        </TouchableOpacity>

                        <View className="flex flex-col justify-between items-center mb-10 mt-6 p-2 gap-2 border border-gray-300 rounded-lg">
                            <LabeledField fieldDescription="Car Name" inputValue={carName} setInputValue={setCarName} inputPlaceholder={car?.name} />
                            <LabeledField fieldDescription="Mileage" inputValue={mileage} setInputValue={setMileage} inputPlaceholder={car?.mileage} />
                            <LabeledField fieldDescription="License Plate" inputValue={licensePlate} setInputValue={setLicensePlate} inputPlaceholder={car?.name} />
                            <LabeledField fieldDescription="Zip Code" inputValue={zipCode} setInputValue={setZipCode} inputPlaceholder={car?.name} />
                        </View>
                        <Text className="font-semibold">Maintenance Settings</Text>
                        <View className="flex flex-col justify-between items-center mb-10 mt-2 p-2 gap-2 border border-gray-300 rounded-lg">
                            {allMaintenances?.map((maintenance, index) => (
                                <TouchableOpacity key={index} className="bg-gray-100 rounded-lg w-full p-2" onPress={() => openMaintenanceModal(maintenance.type, maintenance.adjustedMonths, maintenance.miles)}>
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
