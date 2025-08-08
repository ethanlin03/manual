import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import SortDropDownMenu from '@/components/SortDropDownMenu';

export default function Track() {
	const [searchedCar, setSearchedCar] = useState("");
	const [filter, setFilter] = useState("");
	const [sortAsc, setSortAsc] = useState(false);
	const [sortDesc, setSortDesc] = useState(false);
	const [filterModal, setFilterModal] = useState(false);
	const sortArr = [
		{ label: "Amount of Services", value: "amountOfServices"},
        { label: "Date Added", value: "dateAdded" },
		{ label: "Service Date", value: "serviceDate" },
		{ label: "Mileage", value: "mileage" },
		{ label: "Price", value: "price" },
		{ label: "Year", value: "year" },
	];
	
	const handleCloseFilter = () => {
		setFilterModal(false)
		setSortAsc(false)
		setSortDesc(false)
		setFilter("")
	};
	const submitFilter = () => {
		console.log("filter submitted")
		handleCloseFilter()
	};


	return (
		<SafeAreaView className="flex-1 bg-white">
			{filterModal && (
				<Pressable 
					onPress={handleCloseFilter} 
					className="absolute inset-0 bg-black/50 items-center justify-center z-10"
				>
					<KeyboardAvoidingView
						className="flex-1 justify-center items-center"
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					>
						<View className="flex flex-col bg-white min-w-[60vw] p-4 rounded-lg">
							<Text className="self-center text-lg font-semibold">Sort By</Text>
							<TouchableOpacity onPress={() => setFilterModal(false)} className="p-2 absolute top-0 right-0">
								<Ionicons name="close" size={20} color="black" />
							</TouchableOpacity>
							<View className="flex flex-col justify-between items-center mb-10 mt-6 p-2 gap-6">
								<SortDropDownMenu filter={filter} setFilter={setFilter} dataArr={sortArr}/>
								<View className="flex flex-row gap-10">
									<TouchableOpacity className="p-2 border-gray-400 rounded-full border" onPress={() => {setSortAsc(false); setSortDesc(true)}}>
										<Ionicons name="arrow-down-outline" size={20} color={`${sortDesc ? "#000" : "#9ca3af"}`}/>
									</TouchableOpacity>
									<TouchableOpacity className="p-2 border-gray-400 rounded-full border" onPress={() => {setSortAsc(true); setSortDesc(false)}}>
										<Ionicons name="arrow-up-outline" size={20} color={`${sortAsc ? "#000" : "#9ca3af"}`}/>
									</TouchableOpacity>
								</View>
							</View>
							<Pressable onPress={submitFilter} className="absolute bottom-4 right-4 bg-blue-200 p-2 rounded-lg">
								<Text className="text-sm font-semibold">Submit</Text>
							</Pressable>
						</View>
					</KeyboardAvoidingView>
				</Pressable>
			)}
			<Text className="font-bold text-2xl ml-10">Track Page</Text>
			<View className="flex flex-row items-center justify-between w-[90vw] self-center">
				<View className="flex-grow flex-row py-2 px-4 rounded-lg bg-gray-200 mr-4 w">
					<Ionicons name="search" size={14} color="#888"/>
					<TextInput
						placeholder="Search for car..."
						placeholderTextColor="#888"
						value={searchedCar}
						onChangeText={setSearchedCar}
						className="ml-2 w-[90%] "
					/>
				</View>
				<TouchableOpacity onPress={() => setFilterModal(true)}>
					<Ionicons name="filter" size={14} color="#888"/>
				</TouchableOpacity>
			</View>
			<ScrollView className="flex-1 mx-auto">
				
			</ScrollView>
		</SafeAreaView>
	);
}