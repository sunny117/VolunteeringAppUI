import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import Location from 'app/components/Location.js'

class Home extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<TouchableWithoutFeedback>
				<Location/>
			</TouchableWithoutFeedback>
		);
	};
};

const styles = StyleSheet.create({
	mainContainer: {
		display: 'flex'
	}
});

function mapStateToProps(state) {
	return {

	};
};

function mapDispatchToProps(dispatch) {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);