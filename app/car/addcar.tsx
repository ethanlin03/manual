import { Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const AddCar = () => {
    const router = useRouter();
    const [image, setImage] = useState("");
    // const [image, setImage] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [carName, setCarName] = useState("");
    const [carYear, setCarYear] = useState("");
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");
    const [mileage, setMileage] = useState("");

    const handleBack = () => {
		router.push('/')
	};
    const handleNextPage = () => {
        console.log("Next page");
    }
    const handleImageSelection = () => {
        setOpenModal(true);
    }
    const uploadImage = async () => {
        try {
            await ImagePicker.getCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
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
        } catch (error) {
            throw error;
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white p-4">
			<View className="flex p-4">
                {openModal && 
                    <Pressable onPress={() => setOpenModal(false)} className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <View className="flex flex-col bg-white min-w-[60vw] p-4 rounded-lg">
                            <TouchableOpacity onPress={() => setOpenModal(false)} className="p-2 absolute top-0 right-0">
                                <Ionicons name="close" size={20} color="black" />
                            </TouchableOpacity>
                            <View className="flex flex-row justify-between items-center mb-4 mt-6">
                                <TouchableOpacity onPress={() => setImage('blank.jpg')} className="flex flex-col items-center">
                                    <Ionicons name="cloud-upload-outline" size={30} />
                                    <Text className="text-sm mb-4">Upload an Image</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setImage('blank.jpg')} className="flex flex-col items-center">
                                    <Ionicons name="camera-outline" size={30} />
                                    <Text className="text-sm mb-4">Open Camera</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Pressable>
                }
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons name="arrow-back" size={20}/>
                </TouchableOpacity>
                <View className="flex justify-start items-center mb-6">
                    <Text className="text-2xl font-bold mb-2">Add a new car</Text>
                    {/* Image selection section */}
                    <TouchableOpacity onPress={handleImageSelection} className="flex flex-col items-center justify-center w-[90vw] aspect-[16/9] bg-blue-200 rounded-xl border-2 border-blue-400">
                        <Ionicons name="image-outline" size={30}/>
                        <Text className="mt-2 font-semibold">Select an image</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-col p-2 min-w-full">
                    <Text className="text-sm italic mb-1">Car name:</Text>
                    <View className="flex-grow flex-row py-2 px-2 rounded-lg bg-gray-200 mb-6">
                        <TextInput
                            placeholder="Enter car name..."
                            placeholderTextColor="#888"
                            value={carName}
                            onChangeText={setCarName}
                            className="ml-2"
                        />
                    </View>
                    <Text className="text-sm italic mb-1">Car year:</Text>
                    <View className="flex-grow flex-row py-2 px-2 rounded-lg bg-gray-200 mb-6">
                        <TextInput
                            placeholder="Enter car year..."
                            placeholderTextColor="#888"
                            value={carYear}
                            onChangeText={setCarYear}
                            className="ml-2"
                        />
                    </View>
                    <Text className="text-sm italic mb-1">Car make:</Text>
                    <View className="flex-grow flex-row py-2 px-2 rounded-lg bg-gray-200 mb-6">
                        <TextInput
                            placeholder="Enter car make..."
                            placeholderTextColor="#888"
                            value={carMake}
                            onChangeText={setCarMake}
                            className="ml-2"
                        />
                    </View>
                    <Text className="text-sm italic mb-1">Car model:</Text>
                    <View className="flex-grow flex-row py-2 px-2 rounded-lg bg-gray-200 mb-6">
                        <TextInput
                            placeholder="Enter car model..."
                            placeholderTextColor="#888"
                            value={carModel}
                            onChangeText={setCarModel}
                            className="ml-2"
                        />
                    </View>
                    <Text className="text-sm italic mb-1">Car mileage:</Text>
                    <View className="flex-grow flex-row py-2 px-2 rounded-lg bg-gray-200 mb-20">
                        <TextInput
                            placeholder="Enter car mileage..."
                            placeholderTextColor="#888"
                            value={mileage}
                            onChangeText={setMileage}
                            className="ml-2"
                        />
                    </View>
                    <TouchableOpacity onPress={handleNextPage} className="flex flex-row items-end justify-end">
                        <Ionicons name="arrow-forward" size={16}/>
                    </TouchableOpacity>
                </View>
            </View>
		</SafeAreaView>
    );
};

export default AddCar;