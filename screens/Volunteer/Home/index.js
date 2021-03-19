import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TextInput, Text, Button, Modal, Alert, TouchableOpacity } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { VA_DropDown } from '../../../components/VA_DropDown'
import { VA_Location } from '../../../components/VA_Location'
import { VA_DatePicker } from '../../../components/VA_DatePicker';
import * as searchActivity from '../../../store/Actions/searchActivity'
import volunteerApi from '../../../util/volunteerApi'
import { CurrentLocation } from '../../../util/currentLocation'

import Icon from 'react-native-vector-icons/Ionicons';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.locRef = React.createRef()
	};

	_setType = value => { this.props.activityActions.setType(value) }

	_setLocation = (address, longitude, latitude) => { this.props.activityActions.setLocation(address, longitude, latitude) }

	_setStartDate = value => { this.props.activityActions.setStartDate(value) }

	_setEndDate = value => { this.props.activityActions.setEndDate(value) }

	_handleClick = e => {

		volunteerApi.searchActivity(
			{
				type: this.props.activityState.type,
				startDate: this.props.activityState.startDate,
				endDate: this.props.activityState.endDate,
				location: {
					address: this.props.activityState.address,
					latitude: this.props.activityState.latitude,
					longitude: this.props.activityState.longitude
				}
			}
		)
			.then(response => {
				console.log(response)
			})
			.catch(err => {
				console.log(err)
				Alert.alert(
					title = "Something went wrong.. not able to create the activity :("
				)
			})

	}

	getTodayDate() {
		let date = new Date();
		let yyyy = date.getFullYear();
		let mm = date.getMonth() + 1; // imp to note this as it starts from 0
		let dd = date.getDate();
		return yyyy + '-' + mm + '-' + dd;
	}

	setCurrentLocation = (location) => {
		this._setLocation(location.address, location.longitude, location.latitude);
		this.locRef.current.setAddressText(location.address);
	}

	findCoordinates = () => {
		CurrentLocation.currentLocation(this.setCurrentLocation)
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<TouchableWithoutFeedback>
				<View style={styles.mainContainer}>

					<View style={styles.inputContainer}>
						<Text style={styles.textContainer}>Type * </Text>
						<VA_DropDown
							selectedValue={this.props.activityState.type}
							onValueChange={(itemValue, itemPosition) => {
								this._setType(itemValue)
							}}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.textContainer}> Location * </Text>
						<View style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>

							<VA_Location
								onSelect={(address, longitude, latitude) => {
									this._setLocation(address, longitude, latitude)
								}}
								childRef={this.locRef}
							/>
							<View style={styles.locationIcon}>
								<TouchableOpacity onPress={() => this.findCoordinates() }>
									<Icon name='location-outline' size={20} color='black' />
								</TouchableOpacity>
							</View>

						</View>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.textContainer}>Duration * </Text>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
							<VA_DatePicker
								date={this.props.activityState.startDate}
								onDateChange={value => { this._setStartDate(value) }}
								placeholder="Start Date"
								minDate={this.getTodayDate()}
								maxDate={this.props.activityState.endDate ? this.props.activityState.endDate : undefined}
							/>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>-</Text>
							<VA_DatePicker
								date={this.props.activityState.endDate}
								onDateChange={value => { this._setEndDate(value) }}
								placeholder="End Date"
								minDate={this.props.activityState.startDate ? this.props.activityState.startDate : this.getTodayDate()}
							/>
						</View>
					</View>

					<View
						style={styles.button}
					>
						<Button
							title="Search"
							onPress={e => {
								this._handleClick(e)
							}}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	};
};

const styles = StyleSheet.create({

	mainContainer: {
		flex: 1,
		justifyContent: 'space-between',
		paddingTop: 40,
		paddingBottom: 400,
		backgroundColor: '#c2d6d6'
	},

	inputContainer: {
		justifyContent: 'space-between',
		margin: 10,
		backgroundColor: 'white',
		justifyContent: 'space-between',
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,
		elevation: 8,
		borderRadius: 10,
		paddingLeft: 10,
		paddingRight: 10
	},

	textContainer: {
		fontSize: 16,
		fontWeight: 'bold',
		paddingTop: 5,
	},

	dropDown: {
		marginTop: 4,
		marginBottom: 10,
		height: 60
	},

	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 36
	}
});

function mapStateToProps(state) {
	return {
		activityState: state.searchActivity
	};
};

function mapDispatchToProps(dispatch) {
	return {
		activityActions: bindActionCreators(searchActivity, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);