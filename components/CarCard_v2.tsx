import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

type CarCardProps = {
    name: string;
    desc: string;
    mileage: string;
    image: any;
    index: number;
}

const CarCard: React.FC<CarCardProps> = ({name, desc, mileage, image, index}) => {
    const router = useRouter();

    const handleCarSelect = () => {
        router.push({
            pathname: '/history/[id]',
            params: { id: index.toString() },
        });
    };
    return (
        <TouchableOpacity onPress={handleCarSelect} className="flex flex-col items-center justify-center shadow-gray-300 shadow-sm max-w-[40vw] h-auto bg-white border-b-1 border-gray-400 p-2 mb-2 mr-2">
            <Image source={image} className="h-[14vh] aspect-[4/3] self-center p-2"/>
            <View className="flex flex-row items-start justify-between w-full px-1">
                <View className="flex flex-col items-start justify-start space-y-2 mb-auto">
                    <Text className="text-lg font-semibold mb-1">{name}</Text>
                    <Text className="text-sm italic text-gray-500">{desc}</Text>
                    <Text className="text-sm">{mileage} mi</Text>
                </View>
                <View className="flex items-center justify-center ml-auto mb-2 w-6 h-6 rounded-full bg-red-400">
                    <Text className="font-semibold text-sm">
                        3
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CarCard;