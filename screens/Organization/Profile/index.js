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
import * as createActivity from '../../../store/Actions/createActivity';
import * as orgActivityActions from '../../../store/Actions/orgActivityActions';
import * as searchActivity from '../../../store/Actions/searchActivity';
import * as volActivityActions from '../../../store/Actions/volActivityActions';
import LinearGrad from '../../../components/LinearGrad';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    };

    signOut() {
        GoogleApi.signOut()
            .then(() => {
                this.props.authActions.clearAuth();
                this.props.createActivity.resetState();
                this.props.orgActivityActions.clearActivities();
                this.props.searchActivity.resetState();
                this.props.volActivityActions.clearActivities();
            })
            .catch(error => {
                console.log(error);
            })
    };

    render() {
        return (
            <View style={styles.container}>
                <LinearGrad isOrg={true} />
                <View style={styles.header}>
                    {this.props.userPhotoUrl ?
                        <Image style={styles.avatar} source={{ uri: this.props.userPhotoUrl }} />
                        :
                        <View style={{ ...styles.avatar, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00BFFF' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 50, color: 'white' }}>{this.props.userName[0].toUpperCase()}</Text>
                        </View>
                    }
                </View>
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
    container: {
        flex: 1
    },
    header: {
        backgroundColor: "#00BFFF",
        height: 170,
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
        marginTop: 100
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
        authActions: bindActionCreators(authActions, dispatch),
        createActivity: bindActionCreators(createActivity, dispatch),
        orgActivityActions: bindActionCreators(orgActivityActions, dispatch),
        searchActivity: bindActionCreators(searchActivity, dispatch),
        volActivityActions: bindActionCreators(volActivityActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);