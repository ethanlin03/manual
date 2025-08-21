import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity } from "react-native";
import LabeledField from "./LabeledField";
import { Ionicons } from "@expo/vector-icons";
import AlertModal from "./AlertModal";

type MaintenanceModalProps = {
    maintenance: string,
    months: number,
    miles: number,
    setMaintenanceModal: Dispatch<SetStateAction<boolean>>,
    setMonths: Dispatch<SetStateAction<number>>,
    setMiles: Dispatch<SetStateAction<number>>,
    updateMaintenance: (type: string, newMiles: number, newMonths: number) => void;
};

const MaintenanceModal = ({maintenance, setMaintenanceModal, months, setMonths, miles, setMiles, updateMaintenance} : MaintenanceModalProps) => {
    // might keep alert modal in modal
    // need to update maintenanace
    const [tempMiles, setTempMiles] = useState(miles);
    const [tempMonths, setTempMonths] = useState(months);
    const [alertModal, setAlertModal] = useState(false);

    const handleSubmit = () => {
        updateMaintenance(maintenance, tempMiles, tempMonths);
        setMiles(0);
        setMonths(0);
        setMaintenanceModal(false);
    };

    const handleCancel = () => {
        console.log("leave")
        setAlertModal(false);
    }

    const handleClose = () => {
        if(tempMiles !== miles || tempMonths !== months) {
            setAlertModal(true);
            return;
        }
        setMaintenanceModal(false);
    };

    useEffect(() => {
        console.log(tempMonths);
    }, [])

    return (
        <Pressable onPress={handleClose} className="absolute justify-center items-center inset-0 bg-black/80 z-10">
            { alertModal && <AlertModal handleGoBack={() => setAlertModal(false)} handleLeave={() => setMaintenanceModal(false)} /> }
            <Pressable onPress={() => {}} className="w-[60%] bg-white rounded-lg h-auto p-4 gap-2">
                <View className="relative items-center mb-2">
                    <TouchableOpacity onPress={handleClose} className="absolute left-0">
                        <Ionicons name="close-circle-outline" size={16} />
                    </TouchableOpacity>
                    <Text className="text-gray-700 font-semibold text-lg">
                        {maintenance}
                    </Text>
                </View>
                <View className="gap-2">
                    <LabeledField 
                        fieldDescription="Miles" 
                        inputValue={tempMiles} 
                        setInputValue={setTempMiles} 
                        inputPlaceholder={`${miles} Miles`}
                    />
                    <LabeledField 
                        fieldDescription="Month" 
                        inputValue={tempMonths} 
                        setInputValue={setTempMonths} 
                        inputPlaceholder={`${months} Months`}
                    />
                </View>
                <Text className="text-sm">
                    These intervals will be used to help notify you on upcoming {maintenance.toLowerCase()}s.
                </Text>
                <Text className="text-sm">
                    So type how often you would like to have {maintenance.toLowerCase()}s.
                </Text>
                <Pressable onPress={handleSubmit} className="self-end w-auto bg-blue-200 p-2 rounded-lg mt-4">
                    <Text className="text-sm font-semibold">Submit</Text>
                </Pressable>
            </Pressable>
        </Pressable>
    );
};

export default MaintenanceModal;