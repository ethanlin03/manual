import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useMemo } from "react";
import ServiceSection from "./ServiceSection";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// monthIdx is 0-indexed
const CalendarMonth = ({ initialYear, initialMonthIdx }: { initialYear: number, initialMonthIdx: number }) => {
    const currDay = new Date().getDate();
    const currMonth = new Date().getMonth(); // 0-indexed
    const [year, setYear] = useState(() => initialYear);
    const [monthIdx, setMonthIdx] = useState(() => initialMonthIdx); // 0-indexed

    const calendarDays = useMemo(() => {
        console.log(currMonth, currDay);
        const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
        const firstDay = new Date(year, monthIdx, 1).getDay(); // Sunday = 0
        const days: { day: number; emptyDay: boolean }[] = [];

        for (let i = 0; i < firstDay; i++) {
            days.push({ day: 0, emptyDay: true });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push({ day, emptyDay: false });
        }

        const remainingDays = (7 - (days.length % 7)) % 7;
        for (let i = 0; i < remainingDays; i++) {
            days.push({ day: 0, emptyDay: true });
        }

        return days;
    }, [year, monthIdx]);

    const handlePrevMonth = () => {
        if (monthIdx === 0) {
            setMonthIdx(11);
            setYear((prev) => prev - 1);
        } else
            setMonthIdx((prev) => prev - 1);
    };

    const handleNextMonth = () => {
        if (monthIdx === 11) {
            setMonthIdx(0);
            setYear((prev) => prev + 1);
        } else
            setMonthIdx((prev) => prev + 1);
    };

    return (
        <View className="p-4">
            <View className="border border-gray-400 p-4 rounded-lg">
                <View className="flex flex-row items-center justify-between mb-4">
                    <Pressable onPress={handlePrevMonth}>
                        <Ionicons name="arrow-back-outline"/>
                    </Pressable>
                    <Text className="text-xl font-bold text-center">
                        {monthNames[monthIdx]} {year}
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
                                ((monthIdx === currMonth && item.day === currDay) ? (
                                <View
                                    key={`day-${rowIndex}-${colIndex}`}
                                    className="flex-1 h-12 justify-end items-end border border-blue-500 p-1"
                                >
                                    {!item.emptyDay && (
                                        <View className="bg-blue-400 rounded-full aspect-square">
                                            <Text className="text-sm font-semibold self-center">{item.day}</Text>
                                        </View>
                                    )}
                                </View>
                                ) : (
                                <View
                                    key={`day-${rowIndex}-${colIndex}`}
                                    className="flex-1 h-12 justify-end items-end border border-gray-300 p-1"
                                >
                                    {!item.emptyDay && (
                                        <Text className="text-sm font-semibold">{item.day}</Text>
                                    )}
                                </View>
                                ))  
                            ))}
                        </View>
                    ))}
                </View>
            </View>
            {/* service section */}
        </View>
    );
};

export default CalendarMonth;