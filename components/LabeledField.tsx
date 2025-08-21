import { Dispatch, SetStateAction } from "react";
import { View, Text, TextInput } from "react-native";

type LabeledFieldProps = {
    fieldDescription: string,
    inputValue: any,
    setInputValue: Dispatch<SetStateAction<any>>,
    inputPlaceholder: string | undefined
};

const LabeledField = ({fieldDescription, inputValue, setInputValue, inputPlaceholder} : LabeledFieldProps) => {
    return (
        <View className="flex flex-row items-center p-2 bg-gray-100 rounded-lg">
            <Text className="text-gray-700 w-auto mr-2">{fieldDescription}:</Text>
            <TextInput 
                className="flex-1 p-1 rounded" 
                value={inputValue}
                onChangeText={setInputValue}
                placeholder={inputPlaceholder}
                placeholderTextColor="#9ca3af"
            />
        </View>
    );
};

export default LabeledField;