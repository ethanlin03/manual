import { ActivityIndicator,View, Text, TouchableOpacity, Image } from 'react-native';
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
        console.log(image)
        router.push({
            pathname: '/history/[id]',
            params: { id: id, name: encodeURIComponent(name) },
        });
    };
    return (
        <TouchableOpacity onPress={handleCarSelect} className="flex flex-row items-center shadow-gray-300 shadow-sm max-w-[95vw] bg-white border-b-1 border-gray-400 p-2 mb-2">
            <View className="w-[30vw] aspect-[4/3] mr-2 items-center justify-center">
                <Image source={CarImg} className="w-full h-full" onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)} resizeMode="cover"/>
                {loading && <ActivityIndicator
                    size="small"
                    color="#60a5fa"
                    style={{ position: 'absolute', alignSelf: 'center' }}
                />}
            </View>
            {/* Need to replace later with actual correct image */}
            <View className="flex flex-col items-start justify-start space-y-2 mb-auto">
                <Text className="text-lg font-semibold mb-1">{name}</Text>
                <Text className="text-sm italic text-gray-500">{desc}</Text>
                <Text className="text-sm">{mileage} mi</Text>
            </View>
            <View className={`flex items-center justify-center ml-auto mb-auto w-6 h-6 rounded-full ${alerts >= 4 ? `bg-red-400` : (alerts >= 2 ? 'bg-yellow-400' : 'bg-green-400')}`}>
                <Text className="font-semibold text-xs">
                    {alerts > 9 ? '9+' : alerts}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default CarCard;