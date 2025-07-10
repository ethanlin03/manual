import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import CarCard from '@/components/CarCard';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
		<ScrollView className="flex-1 mx-auto">
			<Text className="font-bold text-2xl">Home Page</Text>
			<View className="space-y-4 pb-16">
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
				<CarCard />
			</View>
		</ScrollView>
    </SafeAreaView>
  );
}
