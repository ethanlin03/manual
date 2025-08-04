import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, ScrollView, Text, TouchableOpacity, View, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useContext, useEffect, useState } from 'react';
import { CarContext } from '../CarContext';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '@/FirebaseConfig';
import CarImg from '@/assets/images/car.png';
import CarDropDownMenu from '@/components/CarDropDown';
import { Car } from '../CarContext';
import ServiceSection from '@/components/ServiceSection';
import { UserContext } from '../UserContext';

const data: Number[] = [];

export default function HistoryPage() {
	const { id, name } = useLocalSearchParams();
	const [userId, setUserId] = useContext(UserContext);
	const decodedName = decodeURIComponent(name as string);
	const [carArr, setCarArr] = useContext(CarContext);
	const [car, setCar] = useState<Car>();
	const [typeOfService, setTypeOfService] = useState("");
	const [items, setItems] = useState("");
	const [mileage, setMileage] = useState("");
	const [price, setPrice] = useState("");
	const [date, setDate] = useState("");
	const [addModal, setAddModal] = useState(false);
	const [removeModal, setRemoveModal] = useState(false);
	const [removeIcon, setRemoveIcon] = useState(false);
	const router = useRouter();

	const handleBack = () => {
		router.back()
	};

	const addService = async () => {
		if (!typeOfService || !items || !mileage || !price || !date) {
			alert("Please fill in all fields");
			return;
		}

		const newService = {
			typeOfService,
			items,
			mileage,
			price,
			date
		};
		try {
			const userCarRef = doc(db, "cars", userId);
			const userCarSnap = await getDoc(userCarRef);

			if (userCarSnap.exists()) {
				const data = userCarSnap.data();
				const cars = data.cars || [];

				const updatedCars = cars.map((car: any) => {
					if (car.name === decodedName) {
						return {
							...car,
							serviceHistory: [...(car.serviceHistory || []), newService]
						};
					}
					return car;
				});

				await updateDoc(userCarRef, { cars: updatedCars });
				alert("Service history added!");

				setTypeOfService("");
				setItems("");
				setMileage("");
				setPrice("");
				setDate("");
			} else {
				alert("No cars found for this user.");
			}
		} catch (error: any) {
			console.error("Error adding service:", error);
			alert("Error adding service: " + error.message);
		}

		setAddModal(false);
	};

	const removeService = () => {
		setRemoveIcon(!removeIcon);
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

	useEffect(() => {
		setRemoveIcon(false);
	}, [car])

	return (
		<View className="flex-1 bg-white">
			{addModal && (
				<Pressable onPress={() => setAddModal(false)} className="absolute inset-0 bg-black/50 items-center justify-center z-10">
					<View className="flex flex-col bg-white min-w-[60vw] p-4 rounded-lg">
						<Text className="self-center text-lg font-semibold">Add service</Text>
						<TouchableOpacity onPress={() => setAddModal(false)} className="p-2 absolute top-0 right-0">
							<Ionicons name="close" size={20} color="black" />
						</TouchableOpacity>
						<View className="flex flex-col justify-between items-center mb-10 mt-6 p-2 gap-6">
							<TextInput
								placeholder="Type of service..."
								placeholderTextColor="black"
								value={typeOfService}
								onChangeText={setTypeOfService}
								className="p-2 bg-gray-200 w-full rounded-lg"
							/>
							<TextInput
								placeholder="Items replaced or changed..."
								placeholderTextColor="black"
								value={items}
								onChangeText={setItems}
								className="p-2 bg-gray-200 w-full rounded-lg"
							/>
							<TextInput
								placeholder="Mileage..."
								placeholderTextColor="black"
								value={mileage}
								onChangeText={setMileage}
								className="p-2 bg-gray-200 w-full rounded-lg"
							/>
							<TextInput
								placeholder="Price..."
								placeholderTextColor="black"
								value={price}
								onChangeText={setPrice}
								className="p-2 bg-gray-200 w-full rounded-lg"
							/>
							<TextInput
								placeholder="Date..."
								placeholderTextColor="black"
								value={date}
								onChangeText={setDate}
								className="p-2 bg-gray-200 w-full rounded-lg"
							/>
							{/* could add additional notes */}
						</View>
						<Pressable onPress={addService} className="absolute bottom-4 right-4 bg-blue-200 p-2 rounded-lg">
							<Text className="text-sm font-semibold">Submit</Text>
						</Pressable>
					</View>
				</Pressable>
			)}
			<View className="flex bg-blue-300">
				<SafeAreaView>
					<TouchableOpacity onPress={handleBack} className="p-4">
						<Ionicons name="arrow-back" size={20}/>
					</TouchableOpacity>
					<CarDropDownMenu car={car} setCar={setCar}/>

					<View className="flex flex-row items-center justify-center self-center mb-10 w-[90vw] gap-10">
						<TouchableOpacity onPress={() => setAddModal(true)} className="flex flex-row items-center gap-2 p-2 px-4 bg-white rounded-lg border-blue-200 border-2">
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
					<ServiceSection specificCar={car} removeService={removeIcon}/>
				</View>
			</ScrollView>
		</View>
	);
}
