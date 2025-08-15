import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, ScrollView, Text, TouchableOpacity, View, Platform, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import React, { use, useContext, useEffect, useState } from 'react';
import { CarContext } from '../CarContext';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '@/FirebaseConfig';
import CarImg from '@/assets/images/car.png';
import CarDropDownMenu from '@/components/CarDropDown';
import { Car } from '../CarContext';
import ServiceSection from '@/components/ServiceSection';
import { UserContext } from '../UserContext';
import ServiceDropDownMenu from '@/components/ServiceDropDown';
import SortDropDownMenu from '@/components/SortDropDownMenu';
import CarSettings from '@/components/CarSettings';

const data: Number[] = [];
const sortArr = [
	{ label: "Date", value: "date" },
	{ label: "Mileage", value: "mileage" },
	{ label: "Price", value: "price" },
];

export default function HistoryPage() {
	const { id, name } = useLocalSearchParams();
	const [userId, setUserId] = useContext(UserContext);
	const [decodedName, setDecodedName] = useState(decodeURIComponent(name as string));
	const [carArr, setCarArr] = useContext(CarContext);
	const [car, setCar] = useState<Car>();
	const [typeOfService, setTypeOfService] = useState("");
	const [items, setItems] = useState("");
	const [mileage, setMileage] = useState("");
	const [price, setPrice] = useState("");
	const [date, setDate] = useState("");
	const [addModal, setAddModal] = useState(false);
	const [filterModal, setFilterModal] = useState(false);
	const [removeIcon, setRemoveIcon] = useState(false);
	const [settings, setSettings] = useState(false);
	const [searchedService, setSearchedService] = useState("");
	const [filter, setFilter] = useState("");
	const [sortAsc, setSortAsc] = useState(false);
	const [sortDesc, setSortDesc] = useState(false);
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

	const openSettings = () => {
		setSettings(true);
	}

	const closeSettings = () => {
		setSettings(false);
	}

	const handleCloseFilter = () => {
		setFilterModal(false)
		setSortAsc(false)
		setSortDesc(false)
		setFilter("")
	};

	const submitSearch = () => {
		console.log("Search submitted")
		setSearchedService("")
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
		if(car)
			setDecodedName(car.name);

	}, [car])

	useEffect(() => {
		console.log(filter)

	}, [filter])

	return (
		<View className="flex-1 bg-white">
			{addModal && (
				<Pressable onPress={() => setAddModal(false)} className="absolute inset-0 bg-black/50 items-center justify-center z-10">
					<KeyboardAvoidingView
						className="flex-1 justify-center items-center"
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<View className="flex flex-col bg-white min-w-[60vw] p-4 rounded-lg">
							<Text className="self-center text-lg font-semibold">Add service</Text>
							<TouchableOpacity onPress={() => setAddModal(false)} className="p-2 absolute top-0 right-0">
								<Ionicons name="close" size={20} color="black" />
							</TouchableOpacity>
							<View className="flex flex-col justify-between items-center mb-10 mt-6 p-2 gap-6">
								<ServiceDropDownMenu typeOfService={typeOfService} setTypeOfService={setTypeOfService}/>
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
					</KeyboardAvoidingView>
				</Pressable>
			)}
			{filterModal && (
				<Pressable 
					onPress={handleCloseFilter} 
					className="absolute inset-0 bg-black/50 items-center justify-center z-10"
				>
					<KeyboardAvoidingView
						className="flex-1 justify-center items-center"
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<View className="flex flex-col bg-white min-w-[60vw] p-4 rounded-lg">
							<Text className="self-center text-lg font-semibold">Sort By</Text>
							<TouchableOpacity onPress={() => setFilterModal(false)} className="p-2 absolute top-0 right-0">
								<Ionicons name="close" size={20} color="black" />
							</TouchableOpacity>
							<View className="flex flex-col justify-between items-center mb-10 mt-6 p-2 gap-6">
								<SortDropDownMenu filter={filter} setFilter={setFilter} dataArr={sortArr}/>
								<View className="flex flex-row gap-10">
									<TouchableOpacity className="p-2 border-gray-400 rounded-full border" onPress={() => {setSortAsc(false); setSortDesc(true)}}>
										<Ionicons name="arrow-down-outline" size={20} color={`${sortDesc ? "#000" : "#9ca3af"}`}/>
									</TouchableOpacity>
									<TouchableOpacity className="p-2 border-gray-400 rounded-full border" onPress={() => {setSortAsc(true); setSortDesc(false)}}>
										<Ionicons name="arrow-up-outline" size={20} color={`${sortAsc ? "#000" : "#9ca3af"}`}/>
									</TouchableOpacity>
								</View>
							</View>
							<Pressable onPress={handleCloseFilter} className="absolute bottom-4 right-4 bg-blue-200 p-2 rounded-lg">
								<Text className="text-sm font-semibold">Submit</Text>
							</Pressable>
						</View>
					</KeyboardAvoidingView>
				</Pressable>
			)}
			{settings && ( <CarSettings car={car} setSettings={setSettings}/> )}
			<View className="flex bg-blue-300">
				<SafeAreaView>
					<TouchableOpacity onPress={handleBack} className="p-4">
						<Ionicons name="arrow-back" size={20}/>
					</TouchableOpacity>
					<CarDropDownMenu car={car} setCar={setCar}/>

					<View className="flex flex-row items-center justify-between self-center mb-10 w-[90vw]">
						<TouchableOpacity onPress={() => setAddModal(true)} className="flex flex-row items-center gap-2 p-2 px-4 bg-white rounded-lg border-blue-200 border-2">
							<Text className="font-semibold">Add a service</Text>
							<Ionicons name='add-circle' color="blue"/>
						</TouchableOpacity>
						<TouchableOpacity onPress={removeService} className="flex flex-row items-center gap-2 p-2 px-4 bg-white rounded-lg border-red-200 border-2">
							<Text className="font-semibold">Remove a service</Text>
							<Ionicons name='remove-circle' color="red"/>
						</TouchableOpacity>
						<TouchableOpacity onPress={openSettings} className='mr-2'>
							<Ionicons name='settings-sharp' color="gray" size={16}/>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
			<View className="flex flex-row items-center w-[90vw] self-center pt-4">
				<View className="flex flex-row py-2 px-4 rounded-lg bg-gray-200 mr-4">
					<Ionicons name="search" size={14} color="#888"/>
					<TextInput
						placeholder="Search for service..."
						placeholderTextColor="#888"
						value={searchedService}
						onChangeText={setSearchedService}
						onSubmitEditing={submitSearch}
						className="ml-2 w-[88%]"
					/>
				</View>
				<TouchableOpacity onPress={() => setFilterModal(true)} className='p-1 rounded-full'>
					<Ionicons name="filter" size={14} color="#888"/>
				</TouchableOpacity>
			</View>
			<ScrollView className="flex-col p-4 mb-10">
				<View className="flex-1 relative min-h-[65vh] h-auto">
					<ServiceSection specificCar={car} removeService={removeIcon} setRemoveService={setRemoveIcon} filter={filter} sortAsc={sortAsc} sortDesc={sortDesc}/>
				</View>
			</ScrollView>
		</View>
	);
}
