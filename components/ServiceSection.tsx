import { Svg, Line } from 'react-native-svg';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/FirebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import { Car } from '@/app/CarContext';
import { UserContext } from '@/app/UserContext';

interface ServiceProps {
    car?: Car;
}

export const ServiceSection = ({ car }: ServiceProps) => {
    const [height, setHeight] = useState(0);
    const [userId, setUserId] = useContext(UserContext);
    const [serviceHistory, setServiceHistory] = useState([]);

    useEffect(() => {
        const fetchServices = async(carName: string | undefined) => {
            const userDoc = doc(db, "cars", userId)
            const userCarSnap = await getDoc(userDoc)
            if(userCarSnap.exists()) {
                const data = userCarSnap.data();
				const cars = data.cars || [];

				const updatedCars = cars.map((car: any) => {
					if (car.name === car.name) {
						setServiceHistory(car.serviceHistory);
                        console.log("Car service" + JSON.stringify(car.serviceHistory));
					}
				});
            }
            console.log(car?.name)
        }

        fetchServices(car?.name)
    }, [car])

    return (
        <View
            style={{ flex: 1 }}
            onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setHeight(height);
            }}
        >
            {height > 0 && (
                <Svg
                    height={height}
                    width="1"
                    style={{ position: 'absolute', left: '10%', zIndex: 0 }}
                >
                <Line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2={height}
                    stroke="black"
                    strokeWidth="3"
                    strokeDasharray="4, 6"
                />
                </Svg>
            )}
            <View className={`flex flex-col justify-center items-center min-h-[${height}] z-10 `}>
                {/* Add more services here */}
                {car?.name === 'Car 1' ? (
                    <View className="flex flex-row items-center z-10 w-full">
                        <View className="flex rounded-full bg-white p-2 border left-[5%] mr-10">
                            <Ionicons name='car' size={24} className="self-center"/>
                        </View>
                        <View className="flex flex-row items-center justify-between w-[70vw] min-h-[8vh] overflow-hidden p-2 pb-4 border-b">
                            <View className="flex flex-col items-start">
                                <Text className="font-semibold text-lg">Specific maintenance</Text>
                                <View className="flex flex-row items-center">
                                    <FontAwesome5 name="road" size={14} className="mr-2"/>
                                    <Text>80000 mi</Text>
                                </View>
                            </View>
                            <View className="flex flex-col items-end">
                                <Text className="italic text-md">07/31/2025</Text>
                                <View className="flex flex-row items-center">
                                    <FontAwesome5 name="dollar-sign" size={10} className="mr-1"/>
                                    <Text className="font-semibold">Price</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View className="flex flex-row items-center z-10 w-full">
                        <View className="flex rounded-full bg-white p-2 border left-[5%] mr-10">
                            <Ionicons name='close' size={24} className="self-center" color='red'/>
                        </View>
                        <View className="flex flex-row items-center justify-between w-[70vw] min-h-[8vh] overflow-hidden p-2">
                            <View className="flex flex-col items-start">
                                <Text className="font-semibold text-lg">Currently no service history</Text>
                            </View>
                        </View>
                    </View>
                )}
                {/* No services template */}
            </View>
        </View>
    );
};

export default ServiceSection;