import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { addDoc, setDoc, collection, doc, arrayUnion, updateDoc } from "firebase/firestore";
import { useState, useEffect, useContext } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from "@/FirebaseConfig";
import { getAuth } from '@firebase/auth';
import { UserContext } from '../UserContext';

const baseSchedule = [
    { type: 'Oil Change', miles: 5000, months: 6 },
    { type: 'Tire Rotation', miles: 7500, months: 6 },
    { type: 'Brake Inspection', miles: 10000, months: 12 },
    { type: 'Transmission Service', miles: 30000, months: 24 },
];

const AddCar = () => {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [carName, setCarName] = useState("");
    const [carYear, setCarYear] = useState("");
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");
    const [mileage, setMileage] = useState("");
    const [annualMileage, setAnnualMileage] = useState("");
    const [userId, setUserId] = useContext(UserContext);

    const handleBack = () => {
		router.push('/(tabs)')
	};
    const adjustSchedule = (annualMileage: number, baseSchedule: { type: string; miles: number; months: number }[]) => {
        const milesPerMonth = annualMileage / 12;

        return baseSchedule.map(item => {
            const monthsByMileage = item.miles / milesPerMonth;
            const adjustedMonths = Math.min(monthsByMileage, item.months);

            return {
                ...item,
                adjustedMonths: Math.round(adjustedMonths * 10) / 10
            };
        });
    };
    const handleNextPage = async () => {
        // will need to handle images later AND find a better way to store users' cars (potentially have docs with arrays)
        if(image && carName && carYear && carMake && carModel && mileage && annualMileage) {
            try {
                const userCarRef = doc(db, "cars", userId);
                const annualMileageNum = Number(annualMileage);
                const adjustedSchedule = adjustSchedule(annualMileageNum, baseSchedule);
                const carId = doc(collection(db, "temp")).id;

                const newCar = {
                    id: carId,
                    name: carName,
                    year: carYear,
                    make: carMake,
                    model: carModel,
                    mileage: mileage,
                    annualMileage: annualMileage,
                    image: image,
                    alerts: 0,
                    maintenanceSchedule: adjustedSchedule
                };
                
                await setDoc(userCarRef, {
                    cars: arrayUnion(newCar)
                }, { merge: true });
                
                alert("New car has been added!")
                router.push('/(tabs)')
            } catch (error: any) {
                alert("Error adding car: " + error.message)
                console.log("There is an error adding car: ", error.message)
            }
        } else {
            alert("Fill in the fields!")
        }
    }
    const handleImageSelection = () => {
        setOpenModal(true)
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
                    aspect: [4, 3],
                    quality: 1,
                });
            } else {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access camera is required!');
                    return;
                }
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.back,
                    allowsEditing: true,
                    aspect: [4, 3],
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
            setImage(image);
            setOpenModal(false);
        } catch (error) {
            throw error;
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
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
            <KeyboardAvoidingView
                className="flex-1 justify-center items-center"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView className="flex p-4">
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="arrow-back" size={20}/>
                    </TouchableOpacity>
                    <View className="flex justify-start items-center mb-6">
                        <Text className="text-2xl font-bold mb-2">Add a new car</Text>
                        {/* Image selection section */}
                        <TouchableOpacity onPress={handleImageSelection} className="flex flex-col items-center justify-center w-[90vw] aspect-[16/9] bg-blue-200 rounded-xl border-2 border-blue-400">
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    className="absolute w-full h-full rounded-xl"
                                    resizeMode="cover"
                                />
                            ) : (
                                <View className="flex flex-col items-center justify-center">
                                    <Ionicons name="image-outline" size={30}/>
                                    <Text className="mt-2 font-semibold">Select an image</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                    <View className="flex flex-col p-2 min-w-full">
                        <Text className="text-sm italic mb-1">Car name:</Text>
                        <TextInput
                            placeholder="Enter name..."
                            placeholderTextColor="#888"
                            value={carName}
                            onChangeText={setCarName}
                            className="rounded-lg bg-gray-200 mb-6 p-2 px-4"
                        />
                        <Text className="text-sm italic mb-1">Year:</Text>
                        <TextInput
                            placeholder="Enter year..."
                            placeholderTextColor="#888"
                            value={carYear}
                            onChangeText={setCarYear}
                            className="rounded-lg bg-gray-200 mb-6 p-2 px-4"
                        />
                        <Text className="text-sm italic mb-1">Make:</Text>
                        <TextInput
                            placeholder="Enter make..."
                            placeholderTextColor="#888"
                            value={carMake}
                            onChangeText={setCarMake}
                            className="rounded-lg bg-gray-200 mb-6 p-2 px-4"
                        />
                        <Text className="text-sm italic mb-1">Model:</Text>
                        <TextInput
                            placeholder="Enter model..."
                            placeholderTextColor="#888"
                            value={carModel}
                            onChangeText={setCarModel}
                            className="rounded-lg bg-gray-200 mb-6 p-2 px-4"
                        />
                        <Text className="text-sm italic mb-1">Mileage:</Text>
                        <TextInput
                            placeholder="Enter mileage..."
                            placeholderTextColor="#888"
                            value={mileage}
                            onChangeText={setMileage}
                            className="rounded-lg bg-gray-200 mb-6 p-2 px-4"
                        />
                        <Text className="text-sm italic mb-1">Amount Driven in a Year:</Text>
                        <TextInput
                            placeholder="Enter annual mileage..."
                            placeholderTextColor="#888"
                            value={annualMileage}
                            onChangeText={setAnnualMileage}
                            className="rounded-lg bg-gray-200 mb-6 p-2 px-4"
                        />
                        <View className="flex items-end">
                            <TouchableOpacity onPress={handleNextPage} className="p-2 rounded-full">
                                <Ionicons name="arrow-forward" size={16}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
		</SafeAreaView>
    );
};

export default AddCar;