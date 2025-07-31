import { useContext, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { CarContext } from "@/app/CarContext";
import CarImg from "@/assets/images/car.png";


const CarDropDownMenu = () => {
    const [carArr, setCarArr] = useContext(CarContext);
    const [car, setCar] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <Dropdown
            data={carArr}
            valueField="name"
            labelField="name"
            maxHeight={300}
            onChange={item => setCar(item.name)}
            search
            searchPlaceholder="Search for car name..."
            placeholder="Select car..."
            renderLeftIcon={() => (
                !car ? (
                    <View style={styles.iconContainer}>
                        <Ionicons name="car" size={30} color="black" />
                    </View>
                ) : (
                    <Image source={CarImg} style={styles.iconContainer} />
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
		backgroundColor: '#e5e7eb',
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
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
});