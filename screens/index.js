import React from 'react';

import SignIn from './SignIn';
import Volunteer from './Volunteer';
import Organization from './Organization';
import GoogleApi from '../util/googleApi'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as authActions from '../store/Actions/authActions';
import { View } from 'react-native';
import Dialog from '../components/Dialog';

class Screens extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        GoogleApi.isSignedIn()
            .then(isSignedInValue => {
                if (isSignedInValue) {
                    GoogleApi.signInSilently()
                        .then(result => {
                            let authState = {
                                isSignedIn: true,
                                userType: this.props.userType,
                                userName: result.user.name,
                                userPhotoUrl: result.user.photo,
                                userEmail: result.user.email,
                            };
                            this.props.authActions.setAuth(authState);
                        })
                        .catch((error) => console.log(error));
                }
            })
    }

    render() {
        if (this.props.isSignedIn)
            return this.props.userType === 'volunteer' ? <View style={{ flex: 1 }}>
                <Volunteer />
                {this.props.isDialogVisible && <Dialog value={this.props.dialog} />}
            </View> :
                <View style={{ flex: 1 }}>
                    <Organization />
                    {this.props.isDialogVisible && <Dialog value={this.props.dialog} />}
                </View>;
        return <SignIn />;
    };
};

function mapStateToProps(state) {
    return {
        isSignedIn: state.authReducer.isSignedIn,
        userType: state.authReducer.userType,
        isDialogVisible: state.authReducer.isDialogVisible,
        dialog: state.authReducer.dialogValue
    };
};

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screens);