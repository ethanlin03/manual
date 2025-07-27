import { ScrollView, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard';
import CarImg from '@/assets/images/car.png';

type Car = {
	index: number;
	name: string;
	desc: string;
	mileage: string
	image: any; 
};

const carInfos = ["16_ct2", "2016 Honda Accord", "70,000"];

export default function Home() {
	const router = useRouter();
	const [carArr, setCarArr] = useState<Car[]>([]);

	const handleAddCar = () => {
		router.push('/car/addcar');
	};

	useEffect(() => {
		const arr = Array.from({ length: 12 }, (_, i) => ({
			index: i,
			name: carInfos[0],
			desc: carInfos[1],
			mileage: carInfos[2],
			image: CarImg
		}));
    	setCarArr(arr);
	}, []);
  	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1 mx-auto p-2">
				<Text className="font-bold text-2xl">Home Page</Text>
				<View className="flex-col pb-16">
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
					{carArr.length > 0 ? (
						<TouchableOpacity onPress={handleAddCar} className="flex flex-row items-center justify-between w-[95vw] bg-white h-20 border border-gray-300 shadow-sm shadow-gray-400 rounded-xl p-4">
							<Text className="text-blue-400 font-semibold text-xl">Add a car</Text>
							<View className="flex-row items-center">
								<Ionicons name="car-sport" size={20} color="#60a5fa"/>
								<Ionicons name="add" size={16} color="#60a5fa"/>
							</View>
						</TouchableOpacity>
					) : (
						<View className="flex flex-col items-center w-[95vw] h-auto bg-white border border-gray-300 shadow-sm shadow-gray-400 p-4">
							<Text className="text-black text-xl font-bold mb-1">
								You currently have no cars in your garage!
							</Text>
							<Text className="text-sm mb-10">
								Track your car's maintenance history and receive notifications about upcoming services.
							</Text>
							<TouchableOpacity onPress={handleAddCar} className="flex flex-row items-center gap-8 max-w-[50%] w-auto px-4 py-2 bg-blue-400 rounded-full">
								<Text className="text-white font-semibold text-lg">Add a car</Text>
								<View className="flex-row items-center">
									<Ionicons name="car-sport" size={20} color="#fff"/>
									<Ionicons name="add" size={16} color="#fff"/>
								</View>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
  	);
}
