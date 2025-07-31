import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import CarCard from '@/components/CarCard';
import Car from '@/assets/images/car.png';
import { UserContext } from '../UserContext';
import { CarContext } from '../CarContext';

export default function History() {
	const [carArr, setCarArr] = useContext(CarContext);
	const [userId, setUserId] = useContext(UserContext);

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
							alerts={car.alerts}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
    );
}