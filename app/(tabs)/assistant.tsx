import { ScrollView, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CarCard from '@/components/CarCard';
import Car from '@/assets/images/car.png';

const fillerResponse = "This is a filler response: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function Assistant() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchHistory, setSearchHistory] = useState<string[]>([]);

	const openSideMenu = () => {

	}

	const submitSearch = () => {
		setSearchHistory([...searchHistory, searchQuery])
		setSearchQuery("")
	}

    return (
        <SafeAreaView className="flex-1 bg-white">
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				// Adjust as needed
			>
				<View className="flex-1 p-4">
					<Text className="font-bold text-2xl mb-4">Assistant Page</Text>
					<TouchableOpacity onPress={openSideMenu} className="pb-4 border-b border-gray-300">
						<Ionicons name="menu-outline" size={24} color="#888"/>
					</TouchableOpacity>
					<ScrollView className="max-h-[75%]">
						{searchHistory.map((search, index) => (
							<View key={index} className="p-4 mb-8">
								<Text className="self-end bg-gray-200 p-3 border border-gray-400 rounded-lg text-sm mb-4">{search}</Text>
								<Text>{fillerResponse}</Text>
							</View>
						))}
					</ScrollView>
					<View className="border-t border-gray-300 px-4 py-4 w-full">
						<View className="flex flex-row items-center py-2 px-4 bg-gray-200 rounded-lg w-full">
							<Ionicons name="search-circle-outline" size={20} color="#888"/>
							<TextInput
								placeholder="Ask anything..."
								placeholderTextColor="#888"
								value={searchQuery}
								onChangeText={setSearchQuery}
								className="ml-2 flex-1"
							/>
							<TouchableOpacity className={`p-1 ${searchQuery.length > 0 ? 'bg-white' : 'bg-transparent'} rounded-full border border-[#888]`} onPress={submitSearch}>
								<Ionicons name='arrow-up-outline' size={14} color="#888"/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
    );
}