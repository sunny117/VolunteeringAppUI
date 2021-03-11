import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import Colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

import apiExports from '../util/apiExports';

class GooglePlacesInput extends React.Component {
	render() {
		return (
			<View style={styles.columnInputContainer}>
				<View style={styles.inputHeaderContainer}>
					<Text style={{ ...styles.inputHeader, color: this.props.inputHeaderColor }}>
						{/* {this.props.title} */}
						Location:
					</Text>
				</View>
				<View style={styles.inputContainer}>
					<GooglePlacesAutocomplete
						// ref={value => { this.childref = value }}
						// key={this.props.defaultValue}
						placeholder= "Enter Location"
						minLength={2}
						autoFocus={false}
						fetchDetails={true}
						multiline
						numberOfLines={5}
						onPress={(data, details = null) => {
							this.props.onSelect(data.description, details.geometry.location.lng, details.geometry.location.lat);
						}}
						// getDefaultValue={() => {
						// 	return this.props.defaultValue;
						// }}
						query={{
							key: '',
							language: 'en'
						}}
						styles={{
							description: {
								fontWeight: 'bold',
							},
							listView: {
								top: -5,
							},
							row: {
								flexGrow: 1,
								paddingLeft: 30,
								width: '85%',
								height: 'auto',
							},
							textInputContainer: {
								backgroundColor: 'rgba(0,0,0,0)',
								borderTopWidth: 0,
								borderBottomWidth: 0,
								alignItems: 'center',
								paddingLeft: 5,
							},
							textInput: {
								marginTop: 0,
								marginLeft: 0,
								marginRight: 0,
								height: 35,
								color: '#5d5d5d',
								fontSize: 15,
								borderRadius: 0,
							}
						}}
						enablePoweredByContainer={false}
						onFail={(error) => console.log(error)}
					/>
					<View style={styles.locationIcon}>
						<TouchableOpacity>
							<Icon name='location-outline' size={20} color='black' />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	columnInputContainer: {
		backgroundColor: 'white',
		justifyContent: 'space-between',
		margin: 10,
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,
		elevation: 8,
		backgroundColor: 'white',
		borderRadius: 10,
	},
	inputHeader: {
		// color: Colors.primary,
		fontSize: 10,
		fontWeight: 'bold',
		paddingLeft: 10,
		paddingTop: 5,
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	locationIcon: {
		paddingTop: 5,
		paddingRight: 5,
	}
});

export default GooglePlacesInput;