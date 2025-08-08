import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface SortProps {
	filter: string;
	setFilter: (value: string) => void;
    dataArr: Array<{ label: string; value: string }>;
}

const SortDropDownMenu = ({filter, setFilter, dataArr}: SortProps) => {
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		console.log(filter)
	}, [filter])

	return (
		<Dropdown
			data={dataArr}
			value={filter}
			labelField="label"
			valueField="value"
			placeholder="Select filter..."
			onChange={(item) => {
				setFilter(item.value);
			}}
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

export default SortDropDownMenu;

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