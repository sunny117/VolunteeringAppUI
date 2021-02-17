import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../store/Actions/authActions';

import GoogleApi from '../util/googleApi';
import {
  GoogleSigninButton,
} from '@react-native-community/google-signin';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  signIn(type) {
    GoogleApi.signIn()
      .then((result) => {
        console.log(result);
        let authState = {
          isSignedIn: true,
          accessToken: result.accessToken,
          userType: type,
          userName: result.user.name,
          userPhotoUrl: result.user.photoUrl,
          userEmail: result.user.email,
        };
        this.props.authActions.setAuth(authState);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={require('../images/orgImage.jpg')}
          />
          <View style={{position: 'absolute'}}>
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => this.signIn("organization")}
            />
            <Text style={styles.imageText}>Organization</Text>
          </View>
        </View>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={require('../images/volunteerImage.jpg')}
          />
          <View style={{position: 'absolute'}}>
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => this.signIn("volunteer")}
            />
            <Text style={styles.imageText}>Volunteer</Text>
          </View>
        </View>
      </View>
    );
  }
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
