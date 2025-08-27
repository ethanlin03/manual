import { ScrollView, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';
import { useState, useEffect, useContext } from 'react';
import FirstTimeModal from '@/components/FirstTimeModal';
import CarCard from '@/components/CarCard';
import { CarContext } from '../CarContext';
import { UserContext } from '../UserContext';

export default function Home() {
	const router = useRouter();
	const navigation = useNavigation();
	const [carArr, setCarArr] = useContext(CarContext);
	const { userId, setUserId, firstTime, setFirstTime } = useContext(UserContext);

	const handleAddCar = () => {
		router.push('/car/addcar');
	};

	useEffect(() => {
		console.log(carArr)
	}, []);
	
  	return (
		<SafeAreaView className="flex-1 bg-white">
			{firstTime && <FirstTimeModal firstTime={firstTime} setFirstTime={setFirstTime} userId={userId}/>}
			<ScrollView className="flex-1 mx-auto p-2">
				<Text className="font-bold text-2xl">Home Page</Text>
				<View className="flex-col pb-16">
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
