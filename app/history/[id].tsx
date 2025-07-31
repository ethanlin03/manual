import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useContext, useEffect, useState } from 'react';
import { CarContext } from '../CarContext';
import CarImg from '@/assets/images/car.png';
import CarDropDownMenu from '@/components/CarDropDown';

const data: Number[] = [];

export default function HistoryPage() {
	const { id } = useLocalSearchParams();
	const [carArr, setCarArr] = useContext(CarContext);
	const [car, setCar] = useState(null);
	const router = useRouter();

	const handleBack = () => {
		router.back()
	};

	useEffect(() => {
		console.log("Car array updated:", carArr);
		carArr.forEach((car) => {
			console.log("car is: " + JSON.stringify(car))
		})
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<TouchableOpacity onPress={handleBack} className="p-4">
				<Ionicons name="arrow-back" size={20}/>
			</TouchableOpacity>
			<CarDropDownMenu/>

			<View className="flex-1 justify-center items-center">
				<Text className="text-2xl font-bold">Car History for ID #{id}</Text>
			</View>
		</SafeAreaView>
	);
}
