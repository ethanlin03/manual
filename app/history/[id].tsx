import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Router } from 'expo-router';

export const unstable_settings = {
    headerShown: false,
};

export default function HistoryPage() {
	const { id } = useLocalSearchParams();
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
				<Text className="text-2xl font-bold">Car History for ID #{id}</Text>
			</View>
		</SafeAreaView>
	);
}