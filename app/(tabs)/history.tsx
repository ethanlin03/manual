import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import CalendarMonth from '@/components/CalendarMonth';
import { UserContext } from '../UserContext';
import { CarContext } from '../CarContext';

export default function History() {
	const [carArr, setCarArr] = useContext(CarContext);
	const [userId, setUserId] = useContext(UserContext);

    return (
        <SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1 mx-auto p-2">
				<Text className="font-bold text-2xl">History Page</Text>
				<CalendarMonth year={2025} monthIdx={7}/>
			</ScrollView>
		</SafeAreaView>
    );
}