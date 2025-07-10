import { ScrollView, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

export default function Track() {
	const [searchedCar, setSearchedCar] = useState("");
	const openFilters = () => {
		console.log("Filters opened");
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<Text className="font-bold text-2xl ml-10">Track Page</Text>
			<View className="flex flex-row items-center justify-between  w-[90vw] self-center">
				<View className="flex-grow flex-row py-2 px-4 rounded-lg bg-gray-200 mr-4">
					<Ionicons name="search" size={14} color="#888"/>
					<TextInput
						placeholder="Search for car..."
						placeholderTextColor="#888"
						value={searchedCar}
						onChangeText={setSearchedCar}
						className="ml-2"
					/>
				</View>
				<TouchableOpacity onPress={openFilters}>
					<Ionicons name="filter" size={14} color="#888"/>
				</TouchableOpacity>
			</View>
			<ScrollView className="flex-1 mx-auto">
				
			</ScrollView>
		</SafeAreaView>
	);
}