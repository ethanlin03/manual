import { View, Text, TouchableOpacity, Image } from 'react-native';
import Car from '@/assets/images/stock_car.png';

const CarCard: React.FC = () => {
    
    return (
        <TouchableOpacity className="flex flex-row items-center shadow-gray-500 shadow-sm max-w-[95vw] w-full bg-white border-b-1 border-gray-500 p-2">
            <Image source={Car} className="max-w-[30vw] h-auto aspect-[16/9]"/>
            <View className="flex flex-col items-start space-y-2">
                <Text>Car Name</Text>
                <Text>Year, Make, Model</Text>
                <Text>Current Mileage</Text>
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