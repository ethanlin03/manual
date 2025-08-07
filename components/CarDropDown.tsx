import type { Car } from "@/app/CarContext";
import { CarContext } from "@/app/CarContext";
import CarImg from "@/assets/images/car.png";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
	car?: Car;
	setCar: (car: Car) => void;
}

const CarDropDownMenu = ({car, setCar}: Props) => {
    const [carArr, setCarArr] = useContext(CarContext);
    const [isFocused, setIsFocused] = useState(false);

	const handleSelectedCar = (car: Car) => {
		setCar(car)
		console.log("Selected car is: " + car.name)
	}
	// Need to load correct car image
    return (
        <Dropdown
            data={carArr}
			value={car?.name ?? null}
            valueField="name"
            labelField="name"
            maxHeight={300}
            onChange={(car: Car) => handleSelectedCar(car)}
            search
            searchPlaceholder="Search for car name..."
            placeholder={car ? car.name : "Select car..."}
            renderLeftIcon={() => (
                car ? (
					<Image source={CarImg} style={styles.iconContainer} />
				) : (
					<Ionicons name="car" size={30} color="black" />
				)
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
                styles.dropdown,
                isFocused && styles.dropdownFocused
            ]}
        />
    );
};

export default CarDropDownMenu;

const styles = StyleSheet.create({
	dropdown: {
		margin: 16,
		height: 50,
		padding: 6,
		backgroundColor: 'white',
		borderRadius: 12,
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
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
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
});