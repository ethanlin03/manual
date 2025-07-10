import { SafeAreaView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
	return (
		<SafeAreaView className="flex-1 max-h-screen items-center justify-start bg-white pb-20">
			<View className="items-center justify-center px-6 pb-20 w-full">
				<View className="flex flex-col items-center mt-10 h-[40vh]">
					<View className="border-2 border-gray-500 rounded-full p-8 mb-4">
						<Ionicons name="person" size={60} color="#6b7280" />
					</View>
					<Text className="font-bold text-2xl text-[#6b7280]">Ethan Lin</Text>
				</View>

				<View className="flex flex-col w-[90vw] space-y-20 h-auto">
					<Text className="font-bold text-xl text-black">Service coming up</Text>
					<Text className="font-bold text-xl text-black">Recently serviced</Text>
					<Text className="font-bold text-xl text-black">Most used</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}