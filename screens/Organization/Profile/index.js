import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import GoogleApi from '../../../util/googleApi';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as authActions from '../../../store/Actions/authActions';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    };

    signOut() {
        GoogleApi.signOut()
        .then(() => {
            this.props.authActions.clearAuth();
        })
        .catch(error => {
            console.log(error);
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image
                                style={styles.iconSmall}
                                source={require('../../../images/menu.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Image style={styles.avatar} source={{ uri: this.props.userPhotoUrl }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>{this.props.userName}</Text>
                        <Text style={styles.name}>(Organization)</Text>
                        <Text style={styles.info}>Email : {this.props.userEmail}</Text>
                        <Text style={styles.info}>Description : {this.props.userDescription}</Text>
                        <Text style={styles.info}>Phone Number : {this.props.userContactNumber}</Text>
                        <Text style={styles.info}>Address : {this.props.userLocation}</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signOut()}>
                            <Text style={{ color: 'white' }}>SignOut</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    menu: {
        marginTop: 50,
        marginLeft: 20
    },
    iconSmall: {
        width: 30,
        height: 30
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 15,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 30,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});


function mapStateToProps(state) {
    return {
        accessToken: state.authReducer.isSignedIn,
        userName: state.authReducer.userName,
        userPhotoUrl: state.authReducer.userPhotoUrl,
        userEmail: state.authReducer.userEmail,
        userDescription: state.authReducer.userDescription,
        userContactNumber: state.authReducer.userContactNumber,
        userLocation: state.authReducer.userLocation
    };
};

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);