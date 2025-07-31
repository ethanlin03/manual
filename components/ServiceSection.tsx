import { Svg, Line } from 'react-native-svg';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export const ServiceSection = () => {
  const [height, setHeight] = useState(0);

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
                    style={{ position: 'absolute', left: '10%', zIndex: 0 }}
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
            <View className={`flex flex-col justify-center items-center min-h-[${height}] z-10 `}>
                <View className="flex flex-row items-center z-10 mt-10 w-full">
                    <View className="flex rounded-full bg-white p-2 border left-[5%] mr-10">
                        <Ionicons name='car' size={24} className="self-center"/>
                    </View>
                    <View className="flex flex-row items-center justify-between w-[70vw] min-h-[8vh] overflow-hidden p-2 pb-4 border-b">
                        <View className="flex flex-col items-start">
                            <Text className="font-semibold text-lg">Specific maintenance</Text>
                            <View className="flex flex-row items-center">
                                <FontAwesome5 name="road" size={14} className="mr-2"/>
                                <Text>80000 mi</Text>
                            </View>
                        </View>
                        <View className="flex flex-col items-end">
                            <Text className="italic text-md">07/31/2025</Text>
                            <View className="flex flex-row items-center">
                                <FontAwesome5 name="dollar-sign" size={10} className="mr-1"/>
                                <Text className="font-semibold">Price</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Add more services here */}
            </View>
        </View>
    );
};

export default ServiceSection;