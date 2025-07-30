import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/FirebaseConfig';
import { getAuth } from 'firebase/auth';
import CarCard from '@/components/CarCard';
import Car from '@/assets/images/car.png';
import { UserContext } from '../UserContext';

type Car = {
	index: number;
	name: string;
	desc: string;
	mileage: string
	image: any; 
};

export default function History() {
	const [carArr, setCarArr] = useState<Car[]>([]);
	const [userId, setUserId] = useContext(UserContext);

	useEffect(() => {
		const fetchUserCars = async () => {
			const userCarRef = doc(db, "cars", userId);
			const userCarsSnap = await getDoc(userCarRef);
			if (userCarsSnap.exists()) {
				const userCarsArr = userCarsSnap.data().cars || []

				const arr = userCarsArr.map((car: any, i: number) => ({
					index: i,
					name: car.name,
					desc: car.year + " " + car.make + " " + car.model,
					mileage: car.mileage,
					image: car.image,
				}));
				setCarArr(arr);
			}
		};

		fetchUserCars();
	}, []);

    return (
        <SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1 mx-auto p-2">
				<Text className="font-bold text-2xl">History Page</Text>
				<View className="space-y-4 pb-16">
					{carArr.map((car, index) => (
						<CarCard 
							key={index}
							index={index}
							name={car.name}
							desc={car.desc}
							mileage={car.mileage}
							image={car.image}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
    );
}