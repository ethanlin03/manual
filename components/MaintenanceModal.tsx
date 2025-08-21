import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { LabeledField } from "./LabeledField";
import { Ionicons } from "@expo/vector-icons";

type MaintenanceModalProps = {
    maintenance: string,
    months: number,
    miles: number,
    setMaintenanceModal: Dispatch<SetStateAction<boolean>>,
    setMonths: Dispatch<SetStateAction<number>>,
    setMiles: Dispatch<SetStateAction<number>>
};

export const MaintenanceModal = ({maintenance, setMaintenanceModal, months, setMonths, miles, setMiles} : MaintenanceModalProps) => {
    const [tempMiles, setTempMiles] = useState(0);
    const [tempMonths, setTempMonths] = useState(0);
    const [alertModal, setAlertModal] = useState(false);

    const handleSubmit = () => {
        setMaintenanceModal(false);
    };

    const handleCancel = () => {
        console.log("cancel")
        setAlertModal(false);
    }

    const handleClose = () => {
        if(tempMiles !== 0 || tempMonths !== 0) {
            setAlertModal(true);
            return;
        }
        setMaintenanceModal(false);
    };

    useEffect(() => {
        console.log(tempMonths);
    }, [tempMonths])

    return (
        <Pressable onPress={handleClose} className="absolute justify-center items-center inset-0 bg-black/50 z-10">
            {alertModal && 
                <Pressable onPress={() => {}} className="absolute justify-center items-center inset-0 bg-black/80 z-10">
                    <View className="flex flex-col justify-center w-[70%] bg-white rounded-lg h-auto p-4 gap-2">
                        <Text className="text-gray-700 font-semibold text-2xl self-center">
                            Confirm
                        </Text>
                        <Text className="text-sm">
                            Are you sure you want to leave? You have unsaved changes.
                        </Text>
                        <View className="flex flex-row self-end gap-2 mt-2">
                            <Pressable onPress={handleSubmit} className="w-auto bg-blue-200 p-2 rounded-lg">
                                <Text className="text-sm font-semibold">Confirm</Text>
                            </Pressable>
                            <Pressable onPress={handleCancel} className="w-auto bg-white border p-2 rounded-lg">
                                <Text className="text-sm font-semibold">Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            }
            <Pressable onPress={() => {}} className="w-[60%] bg-white rounded-lg h-auto p-4 gap-2">
                <View className="relative items-center mb-2">
                    <Ionicons 
                        name="close-circle-outline" 
                        size={16} 
                        onPress={handleClose} 
                        className="absolute left-0" 
                    />
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