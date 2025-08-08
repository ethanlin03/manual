import { Svg, Line } from 'react-native-svg';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useContext, Dispatch, SetStateAction } from 'react';
import React from 'react';
import { getDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/FirebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import { Car } from '@/app/CarContext';
import { UserContext } from '@/app/UserContext';

interface ServiceProps {
    specificCar?: Car;
    removeService: boolean;
    setRemoveService: Dispatch<SetStateAction<boolean>>;
}

interface Service {
    typeOfService: string;
    date: string;
    items: string;
    price: string;
    mileage: string;
}

export const ServiceSection = ({ specificCar, removeService, setRemoveService }: ServiceProps) => {
    const [height, setHeight] = useState(0);
    const [userId, setUserId] = useContext(UserContext);
    const [removedServices, setRemovedServices] = useState<Service[]>([]);
    const [serviceHistory, setServiceHistory] = useState<Service[]>([]);
    const [serviceArr, setServiceArr] = useState([
		"Oil Change", "Tire Rotation", "Brake Inspection", 
		"Wheel Alignment", "Spark Plug Replacement", 
		"Timing Belt Replacement", "Transmission Service"
	]);

    const removeSpecifcService = (specificHistory: Service, index: number) => {
        console.log("Removed service" , index);
        setRemovedServices(prev => [...prev, specificHistory]);
        removedServices.forEach((service) => console.log(service))
    }

    const undoSpecifcServiceRemove = (specificHistory: Service, index: number) => {
        setRemovedServices(prev => 
            prev.filter(service => !(service.typeOfService === specificHistory.typeOfService && service.date === specificHistory.date && service.mileage === specificHistory.mileage))
        );
    }

    const cancelServiceRemoval = () => {
        setRemovedServices([]);
        setRemoveService(false);
    }

    const submitServiceRemoval = async () => {
        if (!userId || !specificCar) return;

        try {
            const userDocRef = doc(db, "cars", userId);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                const cars = userData.cars || [];

                const updatedCars = cars.map((car: any) => {
                    if (car.name === specificCar.name) {
                        const updatedServiceHistory = car.serviceHistory.filter(
                            (service: Service) =>
                                !removedServices.some(
                                    (removed) =>
                                        removed.typeOfService === service.typeOfService &&
                                        removed.date === service.date &&
                                        removed.mileage === service.mileage
                                )
                        );
                        return { ...car, serviceHistory: updatedServiceHistory };
                    }
                    return car;
                });

                await updateDoc(userDocRef, {
                    cars: updatedCars,
                });

                console.log("Services successfully removed.");
                setRemoveService(false);
                setRemovedServices([]);
            }
        } catch (error) {
            console.error("Error removing services:", error);
        }
    };

    useEffect(() => {
        if (!specificCar?.name || !userId) return;

        const userDoc = doc(db, "cars", userId);
        const unsubscribe = onSnapshot(userDoc, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const cars = data.cars || [];

                cars.forEach((car: any) => {
                    if (car.name === specificCar.name) {
                        const sortedHistory = [...(car.serviceHistory || [])].sort((a, b) => {
                            // Currently sorts date from newest to oldest and based upon date stored being a string
                            const [aMonth, aDay, aYear] = a.date.split('/').map(Number);
                            const [bMonth, bDay, bYear] = b.date.split('/').map(Number);

                            return new Date(bYear, bMonth - 1, bDay).getTime() -
                                new Date(aYear, aMonth - 1, aDay).getTime();
                        });
                        setServiceHistory(sortedHistory);
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
                    serviceHistory.map((specificHistory, index) => {
                        const isRemoved = removedServices.some(
                            (s) =>
                                s.typeOfService === specificHistory.typeOfService &&
                                s.date === specificHistory.date &&
                                s.mileage === specificHistory.mileage
                        );
                        if(isRemoved) 
                            return (
                                <View className="flex flex-row items-center z-10 w-full" key={index}>
                                    {removeService && 
                                        <Pressable onPress={() => undoSpecifcServiceRemove(specificHistory, index)}>
                                            <Ionicons name='arrow-undo-circle-outline' size={20} color="red"/>
                                        </Pressable>
                                    }
                                    <View className="flex rounded-full bg-white p-2 border left-[5%] mr-10 border-red-500">
                                        {!serviceArr.includes(specificHistory.typeOfService) ? <Ionicons name='hammer-outline' size={24} color="red"/> : <Ionicons name='car' size={24} color="red"/> }
                                    </View>
                                    <View className="flex flex-row items-center justify-between w-[70vw] min-h-[8vh] overflow-hidden p-2 pb-4 border-b border-red-500">
                                        <View className="flex flex-col items-start">
                                            <Text className="font-semibold text-lg text-red-500">{specificHistory.typeOfService}</Text>
                                            <View className="flex flex-row items-center">
                                                <FontAwesome5 name="road" size={14} className="mr-2" color="red"/>
                                                <Text className="text-red-500">{specificHistory.mileage} mi</Text>
                                            </View>
                                        </View>
                                        <View className="flex flex-col items-end">
                                            <Text className="italic text-md text-red-500">{specificHistory.date}</Text>
                                            <View className="flex flex-row items-center">
                                                <FontAwesome5 name="dollar-sign" size={10} className="mr-1" color="red"/>
                                                <Text className="font-semibold text-red-500">{specificHistory.price}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );

                        return (
                            <View className="flex flex-row items-center z-10 w-full" key={index}>
                                {removeService && 
                                    <Pressable onPress={() => removeSpecifcService(specificHistory, index)}>
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
                        );
                    })
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
            {removedServices.length > 0 && 
                <View className='flex flex-row self-center mt-auto w-full bg-white items-center justify-center p-4 gap-20'>
                    <TouchableOpacity onPress={cancelServiceRemoval} className='bg-gray-200 p-2 px-4 rounded-lg'>
                        <Text className='font-semibold text-lg'>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={submitServiceRemoval} className='bg-gray-200 p-2 px-4 rounded-lg'>
                        <Text className='font-semibold text-lg'>Done</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default ServiceSection;