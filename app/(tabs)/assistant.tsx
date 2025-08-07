import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import CarCard from '@/components/CarCard';
import Car from '@/assets/images/car.png';

export default function Assistant() {

    return (
        <SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1 mx-auto p-2">
				<Text className="font-bold text-2xl">Assistant Page</Text>
				<View className="space-y-4 pb-16">
					
				</View>
			</ScrollView>
		</SafeAreaView>
    );
}