import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import CarImg from '@/assets/images/car.png';
import { useState } from 'react';

type CarCardProps = {
    name: string;
    desc: string;
    mileage: string;
    image: any;
    id: string;
    alerts: number;
}

const CarCard: React.FC<CarCardProps> = ({name, desc, mileage, image, id, alerts}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCarSelect = () => {
        router.push({
            pathname: '/history/[id]',
            params: { id: id, name: encodeURIComponent(name) },
        });
    };
    return (
        <TouchableOpacity onPress={handleCarSelect} className="flex flex-col items-center justify-center shadow-gray-300 shadow-sm max-w-[40vw] h-auto bg-white border-b-1 border-gray-400 p-2 mb-2 mr-2">
            <View className="h-[14vh] aspect-[4/3] itmes-center justify-center p-2">
                <Image source={CarImg} className="w-full h-full" onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)}/>
                {loading && <ActivityIndicator
                    size="small"
                    color="#60a5fa"
                    style={{ position: 'absolute', alignSelf: 'center' }}
                />}
            </View>
            {/* Need to update later with actual car img */}
            <View className="flex flex-row items-start justify-between w-full px-1">
                <View className="flex flex-col items-start justify-start space-y-2 mb-auto">
                    <Text className="text-lg font-semibold mb-1">{name}</Text>
                    <Text className="text-sm italic text-gray-500">{desc}</Text>
                    <Text className="text-sm">{mileage} mi</Text>
                </View>
                <View className={`flex items-center justify-center ml-auto mb-2 w-6 h-6 rounded-full ${alerts >= 4 ? `bg-red-400` : (alerts >= 2 ? 'bg-yellow-400' : 'bg-green-400')}`}>
                    <Text className="font-semibold text-xs">
                        {alerts > 9 ? '9+' : alerts}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CarCard;