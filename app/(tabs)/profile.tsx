import { Image, Pressable, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard_v2';
import CarImg from '@/assets/images/car.png';
import * as ImagePicker from 'expo-image-picker';

type Car = {
	index: number;
	name: string;
	desc: string;
	mileage: string
	image: any; 
};

const carInfos = ["16_ct2", "2016 Honda Accord", "70,000"];

export default function Profile() {
	const [carArr, setCarArr] = useState<Car[]>([]);
	const [openModal, setOpenModal] = useState(false);
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const handleProfilePicture = () => {
		setOpenModal(true);
	}

	useEffect(() => {
		const arr = Array.from({ length: 3 }, (_, i) => ({
			index: i,
			name: carInfos[0],
			desc: carInfos[1],
			mileage: carInfos[2],
			image: CarImg
		}));
    	setCarArr(arr);
	}, []);

	const uploadImage = async (mode: 'gallery' | 'camera') => {
		try {
			let result: ImagePicker.ImagePickerResult;
			if(mode === "gallery") {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Permission to access media library is required!');
					return;
				}
				result = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [1, 1],
					quality: 1,
				});
			} else {
				const { status } = await ImagePicker.requestCameraPermissionsAsync();
				if (status !== 'granted') {
					alert('Permission to access camera is required!');
					return;
				}
				result = await ImagePicker.launchCameraAsync({
					cameraType: ImagePicker.CameraType.front,
					allowsEditing: true,
					aspect: [1, 1],
					quality: 1,
				});
			}
			if(!result.canceled) {
				await saveImage(result.assets[0].uri)
			}
		} catch (error) {
			alert("Error uploading image: " + error);
		}
	}
	const saveImage = async (image: any) => {
		try {
			setProfilePicture(image);
			setOpenModal(false);
		} catch (error) {
			throw error;
		}
	}

	return (
		<SafeAreaView className="flex-1 max-h-screen items-center justify-start bg-white pb-20">
			<ScrollView
				directionalLockEnabled={true}
  				showsVerticalScrollIndicator={false}
			>
				{openModal &&
					<Pressable onPress={() => setOpenModal(false)} className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
						<View className="flex flex-col bg-white min-w-[60vw] p-4 rounded-lg">
							<TouchableOpacity onPress={() => setOpenModal(false)} className="p-2 absolute top-0 right-0">
								<Ionicons name="close" size={20} color="black" />
							</TouchableOpacity>
							<View className="flex flex-row justify-between items-center mb-4 mt-6">
								<TouchableOpacity onPress={() => uploadImage('gallery')} className="flex flex-col items-center">
									<Ionicons name="cloud-upload-outline" size={30} />
									<Text className="text-sm mb-4">Upload an Image</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => uploadImage('camera')} className="flex flex-col items-center">
									<Ionicons name="camera-outline" size={30} />
									<Text className="text-sm mb-4">Open Camera</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Pressable>
				}
				<View className="items-center justify-center px-6 pb-20 w-full">
					<View className="flex flex-col items-center mt-10 h-[40vh]">
						<View className="relative mb-4">
							<View className="border-2 border-gray-500 rounded-full p-1 w-40 h-40 items-center justify-center overflow-hidden">
								{profilePicture ? (
									<Image source={{ uri: profilePicture}} className="w-full h-full rounded-full"/>
								) : (
									<View>
										<Ionicons name="person" size={60} color="#000" />
									</View>
								)}
							</View>
							<TouchableOpacity onPress={handleProfilePicture} className="absolute bottom-1 right-0 bg-white p-2 rounded-full">
								<Ionicons name="camera" size={20} color="#000" />
							</TouchableOpacity>
						</View>
						<Text className="font-bold text-2xl text-[#000]">Ethan Lin</Text>
					</View>
					{/* Add personal info */}
					<View className="flex flex-col w-[90vw]">
						<View>
							<Text className="font-bold text-xl text-black">Service coming up</Text>
							<ScrollView
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								directionalLockEnabled={true}
								className="flex-row h-auto py-2 px-1"
							>
								{carArr.map((car) => (
									<CarCard
										key={car.index}
										index={car.index}
										name={car.name}
										desc={car.desc}
										mileage={car.mileage}
										image={car.image}
									/>
								))}
							</ScrollView>
						</View>
						<Text className="font-bold text-xl text-black">Recently serviced</Text>
							<ScrollView
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								directionalLockEnabled={true}
								className="flex-row h-auto py-2 px-1"
							>
								{carArr.map((car) => (
									<CarCard
										key={car.index}
										index={car.index}
										name={car.name}
										desc={car.desc}
										mileage={car.mileage}
										image={car.image}
									/>
								))}
							</ScrollView>
						<Text className="font-bold text-xl text-black">Most used</Text>
							<ScrollView
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								directionalLockEnabled={true}
								className="flex-row h-auto py-2 px-1"
							>
								{carArr.map((car) => (
									<CarCard
										key={car.index}
										index={car.index}
										name={car.name}
										desc={car.desc}
										mileage={car.mileage}
										image={car.image}
									/>
								))}
							</ScrollView>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}