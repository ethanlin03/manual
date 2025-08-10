import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// monthIdx is 0-based
const CalendarMonth = ({year, monthIdx} : {year: number, monthIdx: number}) => {
    const currMonthName = monthNames[monthIdx];
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const firstDay = new Date(year, monthIdx, 1).getDay(); // 0 indexed for days (Sunday is first)
    const calendarDays: {day: number, emptyDay: boolean}[] = [];

    for(let i = 0; i < firstDay; i++)
        calendarDays.push({ day: 0, emptyDay: true })

    for(let day = 1; day <= daysInMonth; day++)
        calendarDays.push({ day, emptyDay: false})

    const remainingDays = (7 - (calendarDays.length % 7)) & 7;
    for(let i = 0; i < remainingDays; i++)
        calendarDays.push({ day: 0, emptyDay: true })

    const handlePrevMonth = () => {
        console.log("Previous month");
    }

    const handleNextMonth = () => {
        console.log("Next month");
    }

    return (
        <View className="flex-1 p-4">
            <View className="border border-gray-400 p-4 rounded-lg">
                <View className="flex flex-row items-center justify-between mb-4">
                    <Pressable onPress={handlePrevMonth}>
                        <Ionicons name="arrow-back-outline"/>
                    </Pressable>
                    <Text className="text-xl font-bold text-center">
                        {currMonthName} {year}
                    </Text>
                    <Pressable onPress={handleNextMonth}>
                        <Ionicons name="arrow-forward-outline"/>
                    </Pressable>
                </View>
                <View className="flex-row w-full mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                    <Text key={dayName} className="flex-1 text-center font-semibold">
                        {dayName}
                    </Text>
                    ))}
                </View>

                <View className="flex-row flex-wrap">
                    {Array(Math.ceil(calendarDays.length / 7))
                    .fill(0)
                    .map((_, rowIndex) => (
                        <View key={`row-${rowIndex}`} className="flex-row w-full">
                        {calendarDays
                            .slice(rowIndex * 7, (rowIndex + 1) * 7)
                            .map((item, colIndex) => (
                            <View
                                key={`day-${rowIndex}-${colIndex}`}
                                className="flex-1 h-12 justify-end items-end border border-gray-300 p-1"
                            >
                                {!item.emptyDay && (
                                    <Text className="text-sm font-semibold">{item.day}</Text>
                                )}
                            </View>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default CalendarMonth;