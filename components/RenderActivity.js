import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import volunteerApi from '../util/volunteerApi'
import Card from './Card';

import { connect } from "react-redux";

const handleClick = props => {
	volunteerApi.joinActivity({
		volunteerId: props.volunteerId,
		activityId: props.item._id
	}).then(response => {
		console.log(response)
		Alert.alert(
			title = "You have been added to the activity successfully!!"
		)
	})
	.catch(error => {
		console.log(error)
		Alert.alert(
			title = "Something went wrong.. not able to join the activity :("
		)
	})
}

const RenderActivity = props => {
	return (
		<Card>
			<View style={styles.valueContainer}>
				<Text style={styles.valueHeader}>Heading</Text>
				<Text style={styles.value}>{props.item.heading}</Text>
			</View>
			<View style={styles.valueContainer}>
				<Text style={styles.valueHeader}>Description</Text>
				<Text style={styles.value}>{props.item.description}</Text>
			</View>
			<View style={styles.valueContainer}>
				<Text style={styles.valueHeader}>Type</Text>
				<Text style={styles.value}>{props.item.type}</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<View style={styles.valueContainer}>
					<Text style={styles.valueHeader}>Start</Text>
					<Text style={styles.value}>{props.item.startDate}</Text>
				</View>
				<View style={styles.valueContainer}>
					<Text style={styles.valueHeader}>End</Text>
					<Text style={styles.value}>{props.item.endDate}</Text>
				</View>
			</View>
			{props.joinActivity ?
				<View style={styles.valueContainer}>
					<Button
						title="Join Activity"
						onPress={e => {
							handleClick(props)
						}}
					/>
				</View> : null}
		</Card>
	);
};

const styles = StyleSheet.create({
	valueContainer: {
		margin: 5,
		flex: 1
	},
	valueHeader: {
		color: "blue",
		fontSize: 10,
		fontWeight: 'bold'
	},
	value: {
		fontSize: 15
	},
});

function mapStateToProps(state) {
	return {
		volunteerId: state.authReducer.userId
	};
};

function mapDispatchToProps(dispatch) {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderActivity);