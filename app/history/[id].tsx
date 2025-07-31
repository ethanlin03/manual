import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';

const data: Number[] = [];

export default function HistoryPage() {
	const { id } = useLocalSearchParams();
	const [car, setCar] = useState("");
	const router = useRouter();

	const handleBack = () => {
		router.back()
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<TouchableOpacity onPress={handleBack} className="p-4">
				<Ionicons name="arrow-back" size={20}/>
			</TouchableOpacity>
			<Dropdown
				data={data}
				valueField={car}
				maxHeight={300}
				labelField={"label"}
				onChange={item => {
					setCar(item.value);
				}}
			/>
			<View className="flex-1 justify-center items-center">
				<Text className="text-2xl font-bold">Car History for ID #{id}</Text>
			</View>
		</SafeAreaView>
	);
}