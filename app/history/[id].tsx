import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useContext, useEffect, useState } from 'react';
import { CarContext } from '../CarContext';
import CarImg from '@/assets/images/car.png';
import CarDropDownMenu from '@/components/CarDropDown';
import { Car } from '../CarContext';
import ServiceSection from '@/components/ServiceSection';

const data: Number[] = [];

export default function HistoryPage() {
	const { id, name } = useLocalSearchParams();
	const decodedName = decodeURIComponent(name as string);
	const [carArr, setCarArr] = useContext(CarContext);
	const [car, setCar] = useState<Car | null>(null);
	const router = useRouter();

	const handleBack = () => {
		router.back()
	};

	const addService = () => {
		console.log("Added a service");
	};

	const removeService = () => {
		console.log("Removed a service");
	};

	useEffect(() => {
		console.log("Car array updated:", carArr);
		carArr.forEach((car) => {
			console.log("car is: " + JSON.stringify(car))
			if(car.name === name) {
				setCar(car);
				return;
			}
		})
	}, []);

	return (
		<View className="flex-1 bg-white">
			<View className="flex bg-blue-300">
				<SafeAreaView>
					<TouchableOpacity onPress={handleBack} className="p-4">
						<Ionicons name="arrow-back" size={20}/>
					</TouchableOpacity>
					<CarDropDownMenu car={car} setCar={setCar}/>

					<View className="flex flex-row items-center justify-center self-center mb-10 w-[90vw] gap-10">
						<TouchableOpacity onPress={addService} className="flex flex-row items-center gap-2 p-2 px-4 bg-white rounded-lg border-blue-200 border-2">
							<Text className="font-semibold">Add a service</Text>
							<Ionicons name='add-circle' color="blue"/>
						</TouchableOpacity>
						<TouchableOpacity onPress={removeService} className="flex flex-row items-center gap-2 p-2 px-4 bg-white rounded-lg border-red-200 border-2">
							<Text className="font-semibold">Remove a service</Text>
							<Ionicons name='remove-circle' color="red"/>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
			<ScrollView className="flex-col p-4 mb-10">
				<View className="flex-1 relative min-h-[65vh] h-auto">
					<ServiceSection />
					
				</View>
			</ScrollView>
		</View>
	);
}
