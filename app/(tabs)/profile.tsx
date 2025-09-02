import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth, db } from "@/FirebaseConfig";
import { useRouter } from 'expo-router';
import CarCard from '@/components/CarCard_v2';
import * as ImagePicker from 'expo-image-picker';
import { doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../UserContext';
import { CarContext } from '../CarContext';
import TempProfilePic from '@/assets/images/profile_pic.jpg';

export default function Profile() {
	//TODO: Fix signout issue with onSnapshot
	const router = useRouter();
	const [carArr, setCarArr] = useContext(CarContext);
	const [cameraModal, setCameraModal] = useState(false);
	const [settingModal, setSettingModal] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const { userId, setUserId } = useContext(UserContext);
	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const handleProfilePicture = () => {
		setCameraModal(true);
	}

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
			setCameraModal(false);
		} catch (error) {
			throw error;
		}
	}
	const openSettings = () => {
		console.log("Settings opened");
		setSettingModal(true);
	}
	const handleSignOut = async () => {
		try {
			await signOut(auth);
			router.replace('/login')
			console.log("User signed out");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	}

	useEffect(() => {
		const fetchFirstLastName = async () => {
			const userRef = doc(db, "users", userId);
			const userSnap = await getDoc(userRef);
			if(userSnap.exists()) {
				setFirstName(userSnap.data().firstName);
				setLastName(userSnap.data().lastName);
			} 
		};
		fetchFirstLastName();
	}, []);

	return (
		<SafeAreaView className="flex-1 max-h-screen items-center justify-start bg-white pb-20">
			{cameraModal &&
				<Pressable onPress={() => setCameraModal(false)} className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
					<View className="flex flex-col bg-white min-w-[60vw] p-4 rounded-lg">
						<TouchableOpacity onPress={() => setCameraModal(false)} className="p-2 absolute top-0 right-0">
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
			{settingModal && (
				<Pressable onPress={() => setSettingModal(false)} className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
					<KeyboardAvoidingView
						className="flex-1 justify-center items-center"
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<Pressable onPress={(e) => e.stopPropagation()}>
							<View className="flex flex-col items-center bg-white min-w-[60vw] min-h-[50vh] p-6 rounded-lg">
								<TouchableOpacity onPress={() => setSettingModal(false)} className="p-2 absolute top-0 right-0">
									<Ionicons name="close" size={20} color="black" />
								</TouchableOpacity>
								<Text className="font-semibold">Setting Modal</Text>
							</View>
						</Pressable>
					</KeyboardAvoidingView>
				</Pressable>
			)}
			<View className='w-full h-auto'>
				<TouchableOpacity onPress={openSettings} className='mr-2 absolute top-0 right-0 p-4 z-10'>
					<Ionicons name='settings-sharp' color="gray" size={16}/>
				</TouchableOpacity>
			</View>
			<ScrollView
				directionalLockEnabled={true}
  				showsVerticalScrollIndicator={false}
			>
				<View className="items-center justify-center px-6 pb-20 w-full">
					<View className="flex flex-col items-center mt-10 h-[40vh]">
						<View className="relative mb-4">
							<View className="border-2 border-gray-500 rounded-full p-1 w-40 h-40 items-center justify-center overflow-hidden">
								{/* Update later with source={{ uri: profilePicture }} and change !profilePicture to profilePicture */}
								{!profilePicture ? (
									<Image source={TempProfilePic} className="w-full h-full rounded-full"/>
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
						<Text className="font-bold text-2xl text-[#000]">{firstName} {lastName}</Text>
					</View>
					{/* Add personal info */}
					<View className="flex flex-col w-[90vw] mb-2">
						<Text className="font-bold text-xl text-black">Service coming up</Text>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							directionalLockEnabled={true}
							className="flex-row h-auto py-2 px-1"
						>
							{carArr.map((car, i) => (
								<CarCard
									key={i}
									id={car.id}
									name={car.name}
									desc={`${car.year} ${car.make} ${car.model}`}
									mileage={car.mileage}
									image={car.image}
									alerts={car.alerts}
								/>
							))}
						</ScrollView>

						<Text className="font-bold text-xl text-black">Recently serviced</Text>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							directionalLockEnabled={true}
							className="flex-row h-auto py-2 px-1"
						>
							{carArr.map((car, i) => (
								<CarCard
									key={i}
									id={car.id}
									name={car.name}
									desc={`${car.year} ${car.make} ${car.model}`}
									mileage={car.mileage}
									image={car.image}
									alerts={car.alerts}
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
							{carArr.map((car, i) => (
								<CarCard
									key={i}
									id={car.id}
									name={car.name}
									desc={`${car.year} ${car.make} ${car.model}`}
									mileage={car.mileage}
									image={car.image}
									alerts={car.alerts}
								/>
							))}
						</ScrollView>
					</View>
					<TouchableOpacity onPress={handleSignOut} className="flex bg-gray-200 p-2 rounded-full w-[50vw] items-center">
						<Text className="text-red-400 font-semibold">Sign Out</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}