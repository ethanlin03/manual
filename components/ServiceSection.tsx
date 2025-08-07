import { Svg, Line } from 'react-native-svg';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useContext } from 'react';
import React from 'react';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/FirebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import { Car } from '@/app/CarContext';
import { UserContext } from '@/app/UserContext';

interface ServiceProps {
    specificCar?: Car;
    removeService: boolean;
}

interface Service {
    typeOfService: string;
    date: string;
    items: string;
    price: string;
    mileage: string;
}

export const ServiceSection = ({ specificCar, removeService }: ServiceProps) => {
    const [height, setHeight] = useState(0);
    const [userId, setUserId] = useContext(UserContext);
    const [serviceHistory, setServiceHistory] = useState<Service[]>([]);
    const [serviceArr, setServiceArr] = useState([
		"Oil Change", "Tire Rotation", "Brake Inspection", 
		"Wheel Alignment", "Spark Plug Replacement", 
		"Timing Belt Replacement", "Transmission Service"
	]);

    const removeSpecifcService = () => {
        console.log("Removed service");
    }

    useEffect(() => {
        if (!specificCar?.name || !userId) return;

        const userDoc = doc(db, "cars", userId);

        const unsubscribe = onSnapshot(userDoc, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const cars = data.cars || [];

                cars.forEach((car: any) => {
                    if (car.name === specificCar.name) {
                        setServiceHistory(car.serviceHistory || []);
                        console.log("Live update for car:", car.name, car.serviceHistory);
                    }
                });
            }
        });

        return () => unsubscribe();

    }, [specificCar?.name, userId]);

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
                    style={{ position: 'absolute', left: removeService && serviceHistory.length > 0 ? "16%" : "10%", zIndex: 0 }}
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
            <View className={`flex flex-col justify-center items-center min-h-[${height}] z-10 gap-10`}>
                {/* Add more services here */}
                {serviceHistory.length > 0 ? (
                    serviceHistory.map((specificHistory, index) => (
                        <View className="flex flex-row items-center z-10 w-full" key={index}>
                            {removeService && 
                                <Pressable onPress={removeSpecifcService}>
                                    <Ionicons name='remove-circle-outline' size={20} color="red"/>
                                </Pressable>
                            }
                            <View className="flex rounded-full bg-white p-2 border left-[5%] mr-10">
                                {!serviceArr.includes(specificHistory.typeOfService) ? <Ionicons name='hammer-outline' size={24}/> : <Ionicons name='car' size={24}/> }
                            </View>
                            <View className="flex flex-row items-center justify-between w-[70vw] min-h-[8vh] overflow-hidden p-2 pb-4 border-b">
                                <View className="flex flex-col items-start">
                                    <Text className="font-semibold text-lg">{specificHistory.typeOfService}</Text>
                                    <View className="flex flex-row items-center">
                                        <FontAwesome5 name="road" size={14} className="mr-2"/>
                                        <Text>{specificHistory.mileage} mi</Text>
                                    </View>
                                </View>
                                <View className="flex flex-col items-end">
                                    <Text className="italic text-md">{specificHistory.date}</Text>
                                    <View className="flex flex-row items-center">
                                        <FontAwesome5 name="dollar-sign" size={10} className="mr-1"/>
                                        <Text className="font-semibold">{specificHistory.price}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
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