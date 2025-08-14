import { Dimensions, ScrollView, Text, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Svg, Line } from 'react-native-svg';
import { useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/FirebaseConfig';
import { FontAwesome5 } from '@expo/vector-icons';
import CalendarMonth from '@/components/CalendarMonth';
import { UserContext } from '../UserContext';
import { CarContext } from '../CarContext';

interface Service {
    typeOfService: string;
	carName: string;
    date: string;
    items: string;
    price: string;
    mileage: string;
}

export default function History() {
	const [height, setHeight] = useState(0);
	const [currDate, setCurrDate] = useState(new Date());
	const [carArr, setCarArr] = useContext(CarContext);
	const [userId, setUserId] = useContext(UserContext);
	const [overallServiceHist, setOverallServiceHist] = useState<Service[]>([]);
	const [serviceArr, setServiceArr] = useState([
		"Oil Change", "Tire Rotation", "Brake Inspection", 
		"Wheel Alignment", "Spark Plug Replacement", 
		"Timing Belt Replacement", "Transmission Service"
	]);

	useEffect(() => {
		if (!userId) return;

		const userDoc = doc(db, "cars", userId);
		const unsubscribe = onSnapshot(userDoc, (docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data();
				const cars = data.cars || [];

				// Flatten all service histories and tag with car name
				const allHistory = cars.flatMap((car: any) =>
					(car.serviceHistory || []).map((service: any) => ({
						...service,
						carName: car.name
					}))
				);

				const matchedHistory = allHistory.filter((a: Service) => {
					const [aMonth, aDay, aYear] = a.date.split('/').map(Number);
					const year = aYear < 100 ? 2000 + aYear : aYear;
					const historyDate = new Date(year, aMonth - 1, aDay);
					historyDate.setHours(0, 0, 0, 0);
					
					return historyDate.getTime() === currDate.getTime();
				});

				setOverallServiceHist(matchedHistory);
			}
		});
		console.log(overallServiceHist);
		console.log(currDate);

		return () => unsubscribe();
	}, [currDate]);


    return (
        <SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 mx-auto p-2">
				<View className="flex items-center mb-4">
					<CalendarMonth initialYear={currDate.getFullYear()} initialMonthIdx={currDate.getMonth()} currDate={currDate} setCurrDate={setCurrDate}/>
				</View>
				<View className="border-t p-2">
					<Text className="font-bold text-lg self-start mb-2">History on {currDate.getMonth() + 1} / {currDate.getDate()}</Text>
				</View>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					<View
						style={{ flex: 1 }}
						onLayout={(event) => {
							const { height } = event.nativeEvent.layout;
							setHeight(height);
						}}
					>
						{height > 0 && (
							<Svg
								height="100%"
								width="1"
								style={{ position: 'absolute', left: "10%", zIndex: 0 }}
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
							<View className={`flex flex-col justify-center items-center min-h-[${height}] z-10 gap-10 mb-20`}>
								{/* Add more services here */}
								{overallServiceHist.length > 0 ? (
									overallServiceHist.map((specificHistory, index) => {
											return (
												<View className="flex flex-row items-center z-10 w-full" key={index}>
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
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
    );
}