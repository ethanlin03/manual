import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AddCar = () => {
    const router = useRouter();
    const handleBack = () => {
		router.push('/')
	};

    return (
        <SafeAreaView className="flex-1 bg-white">
			<TouchableOpacity onPress={handleBack} className="p-4">
				<Ionicons name="arrow-back" size={20}/>
			</TouchableOpacity>
			<View className="flex-1 justify-center items-center">
				<Text className="text-2xl font-bold">Add car</Text>
			</View>
		</SafeAreaView>
    );
};

export default AddCar;