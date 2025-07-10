import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Car from '@/assets/images/car.png';

const CarCard: React.FC = () => {
    const router = useRouter();

    const handleCarSelect = () => {
        router.push('/history');
    };
    return (
        <TouchableOpacity onPress={handleCarSelect} className="flex flex-row items-center shadow-gray-500 shadow-sm max-w-[95vw] w-full bg-white border-b-1 border-gray-500 p-2">
            <Image source={Car} className="max-w-[30vw] h-auto aspect-[4/3] mr-2"/>
            <View className="flex flex-col items-start justify-start space-y-2 mb-auto">
                <Text className="text-lg font-semibold mb-1">16_ct2</Text>
                <Text className="text-sm italic text-gray-500">2016 Honda Accord</Text>
                <Text className="text-sm">70,000 mi</Text>
            </View>
            <View className="flex items-center justify-center ml-auto mb-auto w-6 h-6 rounded-full bg-red-400">
                <Text className="font-semibold text-sm">
                    3
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default CarCard;