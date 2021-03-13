import React from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';

export const VA_DatePicker = props => {
	return (
		<DatePicker
			{...props}
			style={styles.container}
			mode="date"
			showIcon={false}
			format="YYYY-MM-DD"
			confirmBtnText="✅"
			cancelBtnText="❌"
			customStyles={{
				placeholderText: {
					color: '#595959'
				},
				dateText: {
					fontSize: 17,
					fontStyle: 'italic',
					fontWeight: 'bold'
				},
				dateInput: {
					borderWidth: 0
				}
			}}			
		/>
	);
};

const styles = StyleSheet.create({

	container: {
		justifyContent: 'space-between',
		margin: 10,
		backgroundColor: '#f0f5f5',
		justifyContent: 'space-between',
		borderRadius: 10,
		paddingLeft: 10
	},

})