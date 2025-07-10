import { View, Text } from 'react-native';
import CarCard from '@/components/CarCard';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-bold text-black text-2xl">Home Page</Text>
      <CarCard/>
    </View>
  );
}

