import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Home';
import Profile from './Profile';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import * as authActions from '../../store/Actions/authActions';

import OrganizationApi from '../../util/organizationApi';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/Ionicons';
import UserActivities from './UserActivities';


class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: -1
        };
    };

    componentDidMount() {
        OrganizationApi.getOrganization(this.props.userEmail)
            .then(result => {
                if (result.org.length == 0) {
                    this.setState({
                        newUser: 1
                    })
                }
                else {
                    this.setState({
                        newUser: 0
                    });
                    let user = result.org[0];
                    this.props.authActions.setAuth({
                        userId: user._id,
                        userName: user.name,
                        userEmail: user.email,
                        userDescription: user.orgDescription,
                        userContactNumber: user.contactNumber,
                        userLocation: user.location
                    })
                }
            })

    };

    onPressFinish() {
        OrganizationApi.createOrganization({
            name: this.props.userName,
            email: this.props.userEmail,
            orgDescription: this.props.userDescription,
            contactNumber: this.props.userContactNumber,
            location: this.props.userLocation
        }).then(result => {
            this.setState({
                newUser: 0
            });
            const user = result.org
            this.props.authActions.setAuth({
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                userDescription: user.orgDescription,
                userContactNumber: user.contactNumber,
                userLocation: user.location
            })
        })
    };

    render() {
        if (this.state.newUser == 1) {
            return (
                <View style={{ backgroundColor: 'grey', flex: 1 }}>
                    <KeyboardAwareScrollView>
                        <View onStartShouldSetResponder={() => true}>
                            <Text style={{ ...styles.inputHeader, fontSize: 20, margin: 50, alignSelf: 'center' }}>ADD ORGANIZATION </Text>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputHeader}>Name</Text>
                                <TextInput
                                    placeholder="Organization Name"
                                    style={styles.input}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    value={this.props.userName}
                                    onChangeText={(value) => this.props.authActions.setUserName(value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputHeader}>Email</Text>
                                <TextInput
                                    placeholder="Organization Email"
                                    style={styles.input}
                                    editable={false}
                                    value={this.props.userEmail}
                                    onChangeText={(value) => this.props.authActions.setUserEmail(value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputHeader}>Description</Text>
                                <TextInput
                                    placeholder="Short description of the organization"
                                    style={styles.input}
                                    value={this.props.userDescription}
                                    onChangeText={(value) => this.props.authActions.setUserDescription(value)}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputHeader}>Contact Number</Text>
                                <TextInput
                                    placeholder="Organization Phone Number"
                                    style={styles.input}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    keyboardType='number-pad'
                                    value={this.props.userContactNumber}
                                    onChangeText={(value) => this.props.authActions.setUserContactNumber(value.replace(/[^0-9]/g, ''))}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputHeader}>Location</Text>
                                <TextInput
                                    placeholder="Organization Address"
                                    style={styles.input}
                                    value={this.props.userLocation}
                                    onChangeText={(value) => this.props.authActions.setUserLocation(value)}
                                />
                            </View>

                            <View style={styles.goContainer}>
                                <TouchableOpacity onPress={() => this.onPressFinish()}>
                                    <Text style={styles.goText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            )
        };
        const Tab = createBottomTabNavigator();
        return (
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            }
                            else if (route.name === 'Activity') {
                                iconName = focused ? 'reader' : 'reader-outline';
                            }
                            else if (route.name === 'Profile') {
                                iconName = focused ? 'person-circle' : 'person-circle-outline';
                            }
                            return <Icon name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'black',
                        inactiveTintColor: 'gray',
                        keyboardHidesTabBar: true,
                        labelStyle: {
                            marginBottom: 2,
                        },
                    }}>
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Activity" component={UserActivities} />
                    <Tab.Screen name="Profile" component={Profile} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    };
};

const styles = StyleSheet.create({
    inputHeader: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },
    input: {
        padding: 10,
        fontSize: 15,
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'white'
    },
    inputContainer: {
        padding: 10,
        width: '100%'
    },
    goContainer: {
        alignItems: 'center',
        margin: 50,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        marginLeft: '40%',
        marginRight: '40%'
    },
    goText: {
        color: 'grey',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
})

function mapStateToProps(state) {
    return {
        userEmail: state.authReducer.userEmail,
        userName: state.authReducer.userName,
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

export default connect(mapStateToProps, mapDispatchToProps)(Organization);