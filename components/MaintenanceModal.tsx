import { Dispatch, SetStateAction, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { LabeledField } from "./LabeledField";

type MaintenanceModalProps = {
    maintenance: string,
    setMaintenanceModal: Dispatch<SetStateAction<boolean>>
};

export const MaintenanceModal = ({maintenance, setMaintenanceModal} : MaintenanceModalProps) => {
    const [month, setMonth] = useState("");
    const [miles, setMiles] = useState("");

    return (
        <Pressable onPress={() => setMaintenanceModal(false)} className="absolute justify-center items-center inset-0 bg-black/50 z-10">
            <View className="w-[60%] bg-white rounded-lg h-auto p-4 gap-2">
                <Text className="text-gray-700 w-auto mr-2 self-center font-semibold text-lg">{maintenance}</Text>
                <View className="gap-2">
                    <LabeledField fieldDescription="Miles" inputValue={miles} setInputValue={setMiles} inputPlaceholder="10000 Miles" />
                    <LabeledField fieldDescription="Month" inputValue={month} setInputValue={setMonth} inputPlaceholder="12 Months" />
                </View>
                <Text className="text-sm">
                    These intervals will be used to help notify you on upcoming {maintenance.toLowerCase()}s.
                </Text>
                <Text className="text-sm">
                    So type how often you would like to have {maintenance.toLowerCase()}s.
                </Text>
                {/* Could include recommended */}
            </View>
        </Pressable>
    );
};