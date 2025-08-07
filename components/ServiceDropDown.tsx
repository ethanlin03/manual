import type { Car } from "@/app/CarContext";
import { CarContext } from "@/app/CarContext";
import CarImg from "@/assets/images/car.png";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const ServiceDropDownMenu = () => {
	const [service, setService] = useState("");
	const [searchText, setSearchText] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const [serviceArr, setServiceArr] = useState([
		"Oil Change", "Tire Rotation", "Brake Inspection", 
		"Wheel Alignment", "Spark Plug Replacement", 
		"Timing Belt Replacement", "Transmission Service"
	]);

	const filteredData = [
		...serviceArr
			.filter(s => s.toLowerCase().includes(searchText.toLowerCase()))
			.map(s => ({ label: s, value: s })),
		...(searchText && !serviceArr.includes(searchText)
			? [{ label: `Add "${searchText}"`, value: searchText }]
			: [])
	];

	useEffect(() => {
		console.log(service)
	}, [service])

	return (
		<Dropdown
			data={filteredData}
			value={service}
			labelField="label"
			valueField="value"
			search
			searchPlaceholder="Search or add service..."
			placeholder="Select or add service..."
			onChange={(item) => {
				if (!serviceArr.includes(item.value)) {
				setServiceArr([...serviceArr, item.value]);
				}
				setService(item.value);
			}}
			onChangeText={(text) => setSearchText(text)}
			style={[
				styles.dropdown,
				isFocused && styles.dropdownFocused
			]}
			selectedTextStyle={styles.selectedTextStyle}
			placeholderStyle={styles.placeHolderStyle}
			inputSearchStyle={styles.inputSearchStyle}
			itemTextStyle={styles.itemTextStyle}
		/>
	);
};

export default ServiceDropDownMenu;

const styles = StyleSheet.create({
	dropdown: {
		height: 30,
		padding: 8,
		backgroundColor: '#e5e7eb',
		borderRadius: 8,
        width: '100%'
	},
	dropdownFocused: {
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	icon: {
		marginRight: 5,
	},
	selectedTextStyle: {
		fontSize: 14,
	},
	placeHolderStyle: {
		fontSize: 14
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	iconContainer: {
		width: 40,
		height: 40,
		borderRadius: 24,
		marginRight: 8,
		overflow: 'hidden',
		backgroundColor: '#e5e7eb',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputSearchStyle: {
		padding: 2,
		fontSize: 14,
		height: 36,
    },
	itemTextStyle: {
		fontSize: 14
	}
});