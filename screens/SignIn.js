import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../store/Actions/authActions';

import GoogleApi from '../util/googleApi';

class SignInCard extends React.Component {
	constructor(props) {
		super(props);
	}

	signIn(type) {
		GoogleApi.signIn()
			.then((result) => {
				let authState = {
					isSignedIn: true,
					userType: type,
					userName: result.user.name,
					userPhotoUrl: result.user.photo,
					userEmail: result.user.email,
				};
				this.props.superProps.authActions.setAuth(authState);
			})
			.catch((error) => console.log(error));
	}

	render() {
		return (
			<TouchableHighlight
				onPress={() => {
					this.signIn(this.props.role)
				}}>
				<View style={styles.imageView}>
					<Image
						style={styles.image}
						source={this.props.imageUrl}
					/>
					<Text style={styles.imageText}>{this.props.role}</Text>
				</View>
			</TouchableHighlight>
		)
	}
}

const SignIn = props => {
	const url = {
		volunteer: require(`../images/volunteerLanding.jpg`),
		organization: require(`../images/organizationLanding.jpg`)
	}
	return (
		<View style={styles.container}>
			<SignInCard superProps = {props} imageUrl={url.volunteer} role="volunteer" />
			<SignInCard superProps = {props} imageUrl={url.organization} role="organization" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageView: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: Dimensions.get('screen').height / 2,
		width: Dimensions.get('window').width,
	},
	imageText: {
		position: 'absolute',
		fontWeight: 'bold',
		fontSize: 50,
		color: 'white',
	},
});

function mapStateToProps(state) {
	return {
		isSignedIn: state.authReducer.isSignedIn,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		authActions: bindActionCreators(authActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
