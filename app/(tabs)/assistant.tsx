import { ActivityIndicator, ScrollView, Text, TextInput, View, SafeAreaView, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GoogleGenAI } from '@google/genai';

//const fillerResponse = "This is a filler response: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });
const fakeChats = [
	{ id: 1, title: "Debugging React state issue" },
	{ id: 2, title: "SQL query optimization" },
	{ id: 3, title: "Resume skills refinement" },
	{ id: 4, title: "Consumer privacy law duties" },
	{ id: 5, title: "C++ map default values" },
	{ id: 6, title: "LeetCode anagram solution" },
	{ id: 7, title: "Vector frequency counter" },
	{ id: 8, title: "Serverless vs full-stack APIs" },
	{ id: 9, title: "Tiva C microcontroller pins" },
	{ id: 10, title: "UI overlay design in React" }
];

export default function Assistant() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchHistory, setSearchHistory] = useState<string[]>([]);
	const [sidebar, setSidebar] = useState(false);
	const [thinking, setThinking] = useState(false);
	const [selectedChat, setSelectedChat] = useState(0);
	const scrollRef = useRef<ScrollView | null>(null);

	const submitSearch = async () => {
		if (!searchQuery.trim()) return;

		// Add the user message to history first
		setSearchQuery("");
		setSearchHistory(prev => [...prev, searchQuery]);
		setThinking(true);

		try {
			const result = await ai.models.generateContent({
				model: "gemini-2.5-flash",
				contents: searchQuery
			});
			const responseText = result.text;

			// Add Gemini’s reply to the history
			setSearchHistory(prev => [...prev, `🤖 ${responseText}`]);
		} catch (err) {
			console.error(err);
			setSearchHistory(prev => [...prev, "⚠ Error: Could not fetch response"]);
		}

		setThinking(false);
	}

	const setChat = (i: number) => {
		setSelectedChat(i);
		// need to open the chat for that
		setSidebar(false);
	}

	useEffect(() => {
		if (!scrollRef.current) return;
		setTimeout(() => {
			scrollRef.current?.scrollToEnd({ animated: true });
		}, 50);
	}, [searchHistory]);


    return (
        <SafeAreaView className="flex-1 bg-white">
			<KeyboardAvoidingView
				className="flex-1"
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				// Adjust as needed
			>
				<View className="flex-1 p-4">
					<Text className="font-bold text-2xl mb-4">Assistant Page</Text>
					<View className="pb-2 border-b border-gray-300">
						<TouchableOpacity onPress={() => setSidebar(!sidebar)} className="flex rounded-full h-8 aspect-square items-center justify-center">
							<Ionicons name="menu-outline" size={24} color="#888" className=""/>
						</TouchableOpacity>
					</View>
					{sidebar && (
						<Pressable
							className="absolute inset-0 z-50"
							onPress={() => setSidebar(false)}
						>
							<View className="flex-1 bg-[rgba(0,0,0,0.35)] z-60 border-t border-gray-300">
								<View className="flex flex-col w-[60vw] h-full bg-white p-4">
									<View className="h-[20%]">
										<View className="flex flex-row justify-between mb-6">
											<Text className="font-bold text-lg">Menu</Text>
											<TouchableOpacity onPress={() => setSidebar(false)}>
												<Ionicons name="chevron-back-outline" size={24}/>
											</TouchableOpacity>
										</View>
										<View className="flex flex-row items-center mb-4">
											<Ionicons name="create-outline" size={24} className="mr-1"/>
											<Text>New Chat</Text>
										</View>
										<View className="flex flex-row items-center">
											<Ionicons name="search-outline" size={24} className="mr-1"/>
											<Text>Search Chats</Text>
										</View>
									</View>
									<View className="flex-1">
										<Text className="font-semibold text-lg mb-4">Chats</Text>
										<ScrollView className="flex-col gap-8 mb-10">
											{fakeChats.map((chat, i) => (
												<TouchableOpacity key={i} onPress={() => setChat(i)} className={`p-3 ${i === selectedChat ? `bg-blue-200` : ``} rounded-xl shadow`}>
													<Text className="text-lg">{chat.title}</Text>
												</TouchableOpacity>
											))}
										</ScrollView>
									</View>
								</View>
							</View>
						</Pressable>
					)}
					<ScrollView ref={scrollRef} className="flex-1 max-h-[75%]" contentContainerStyle={{ flexGrow: 1, paddingBottom: 8 }} keyboardShouldPersistTaps="handled">
						{searchHistory.length === 0 ? (
								<View className="flex-1 justify-center items-center">
									<Text className="text-gray-400">No messages yet — ask something!</Text>
								</View>
							) : (
								<>
									{searchHistory.map((msg, idx) => (
										<View key={idx} className={`p-4 ${msg.startsWith("🤖") ? "items-start" : "items-end"}`}>
											<View className={`p-3 rounded-lg border ${msg.startsWith("🤖") ? "bg-white" : "bg-gray-200"}`}>
												<Text>{msg.replace(/^🤖 /, "")}</Text>
											</View>
										</View>
									))}
									{thinking && (
										<View className="p-4 items-start">
											<View className="p-3 rounded-lg border bg-white flex-row items-center">
											<ActivityIndicator size="small" color="#666" />
											<Text className="ml-2 italic text-gray-600">Thinking...</Text>
											</View>
										</View>
									)}
								</>
						)}
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
							<TouchableOpacity className={`p-1 ${searchQuery.length > 0 ? 'bg-white' : 'bg-transparent border-[#888]'} rounded-full border`} onPress={submitSearch}>
								<Ionicons name='arrow-up-outline' size={14} color={`${searchQuery.length > 0 ? "black" : "#888"}`}/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
    );
}