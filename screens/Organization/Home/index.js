import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import Location from 'app/components/Location.js'
import Date from 'app/components/Date';

class Home extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<TouchableWithoutFeedback>
				<View style={{ flex: 1 }}>
					<View>
						<TextInput 
							defaultValue= ""
							maxLength= {64}
							placeholder= "Heading"
							placeholderTextColor= "#a6a6a6"
						/>
					</View>
					<View>
						<TextInput 
							defaultValue= ''
							multiline
							maxLength={2048}
							placeholder= "Description"
							placeholderTextColor= "#a6a6a6"
						/>
					</View>
					<Location />
					<Date />
					<Date />
				</View>
			</TouchableWithoutFeedback>
		);
	};
};

const styles = StyleSheet.create({});

function mapStateToProps(state) {
	return {

	};
};

function mapDispatchToProps(dispatch) {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);