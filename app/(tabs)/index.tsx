import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import CarCard from '@/components/CarCard';
import Car from '@/assets/images/car.png';

const carInfos = ["16_ct2", "2016 Honda Accord", "70,000"];

export default function Home() {
  	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1 mx-auto">
				<Text className="font-bold text-2xl">Home Page</Text>
				<View className="space-y-4 pb-16">
					{Array.from({length: 12}).map((_, index) => (
						<CarCard 
							key={index}
							index={index}
							name={carInfos[0]}
							desc={carInfos[1]}
							mileage={carInfos[2]}
							image={Car}
						/>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
  	);
}
