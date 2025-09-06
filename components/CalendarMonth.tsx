import { Pressable, View, Text } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useMemo } from "react";
import ServiceSection from "./ServiceSection";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// need to have current date selected highlighted

// monthIdx is 0-indexed
const CalendarMonth = ({ initialYear, initialMonthIdx, currDate, setCurrDate }: { initialYear: number, initialMonthIdx: number, currDate: Date, setCurrDate: Dispatch<SetStateAction<Date>> }) => {
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

    useEffect(() => {
        console.log("The current date is: ", currDate);
        console.log(currDate.getDate())
    }, [currDate]);

    return (
        <View className="p-2">
            <View className="border border-gray-300 p-4 rounded-lg">
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
                                <Pressable
                                    key={`day-${rowIndex}-${colIndex}`}
                                    className="flex-1"
                                    onPress={() => {
                                    if (!item.emptyDay)
                                        setCurrDate(new Date(year, monthIdx, item.day));
                                    }}
                                >
                                    <View className={`h-12 justify-end items-end border-2 rounded-lg aspect-square mb-2 ${item.day === currDate.getDate() && monthIdx === currDate.getMonth() ? "border-blue-300" : "border-gray-200"} p-1`}>
                                        {!item.emptyDay && (
                                            <View className={`rounded-full aspect-square items-center justify-center ${item.day === currDate.getDate() && monthIdx === currDate.getMonth() ? "bg-gray-200" : ""}`}>
                                                <Text className={`text-sm font-bold ${monthIdx === currMonth && item.day === currDay && "text-blue-500"}`}>
                                                    {item.day}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </Pressable>
                                
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