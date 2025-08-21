import { Pressable, Text, View } from "react-native";

type AlertModalProps = {
    handleGoBack: () => void; 
    handleLeave: () => void;
};

const AlertModal = ({handleGoBack, handleLeave} : AlertModalProps) => {
    return (
        <Pressable onPress={() => {}} className="absolute justify-center items-center inset-0 bg-black/80 z-10">
            <View className="flex flex-col justify-center w-[70%] bg-white rounded-lg h-auto p-4 gap-2">
                <Text className="text-gray-700 font-semibold text-2xl self-center">
                    Confirm
                </Text>
                <Text className="text-sm">
                    Are you sure you want to leave? You have unsaved changes.
                </Text>
                <View className="flex flex-row self-end gap-2 mt-2">
                    <Pressable onPress={handleLeave} className="w-auto bg-blue-200 p-2 rounded-lg">
                        <Text className="text-sm font-semibold">Confirm</Text>
                    </Pressable>
                    <Pressable onPress={handleGoBack} className="w-auto bg-white border p-2 rounded-lg">
                        <Text className="text-sm font-semibold">Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

export default AlertModal;