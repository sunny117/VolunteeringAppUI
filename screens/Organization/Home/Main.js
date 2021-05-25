import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { VA_DropDown } from '../../../components/VA_DropDown'
import { VA_Location } from '../../../components/VA_Location'
import * as createActivity from '../../../store/Actions/createActivity'
import organizationApi from '../../../util/organizationApi'
import { CurrentLocation } from '../../../util/currentLocation'
import LoadingScreen from '../../../components/LoadingScreen';
import LinearGrad from '../../../components/LinearGrad';

import Icon from 'react-native-vector-icons/Ionicons';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            warning: false
        }
        this.locRef = React.createRef()
    };

    _setHeading = value => { this.props.activityActions.setHeading(value) }

    _setType = value => { this.props.activityActions.setType(value) }

    _setLocation = (address, longitude, latitude) => { this.props.activityActions.setLocation(address, longitude, latitude) }

    _setDescription = value => { this.props.activityActions.setDescription(value) }

    _handleClick = () => {
        if (
            this.props.activityState.heading
            && this.props.activityState.type
            // && this.props.activityState.address
            // && this.props.activityState.longitude
            // && this.props.activityState.latitude
        ) {
            this.setState({
                warning: false
            })
            this.props.navigation.navigate("Slots")
        } else {
            this.setState({
                warning: true
            })
        }
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

    componentDidMount() {
        this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
            if (this.props.route.params) {
                this.props.route.params.clearLocation ? this.locRef.current.clear() : null;
            }
        });
    };

    componentWillUnmount() {
        this._unsubscribeFocus();
    }

    render() {
        return (
            <TouchableWithoutFeedback>

                <View style={{ flex: 1 }}>
                    <LinearGrad isOrg={true} />
                    {this.props.isLoading && <LoadingScreen />}
                    <KeyboardAwareScrollView>
                        <View style={styles.mainContainer} onStartShouldSetResponder={() => true}>
                            <View style={styles.header}>
                                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}> Create an Activity </Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.textContainer}>Heading * </Text>
                                <TextInput
                                    value={this.props.activityState.heading}
                                    maxLength={64}
                                    placeholder="Enter Heading"
                                    placeholderTextColor="#a6a6a6"
                                    onChangeText={value => this._setHeading(value)}
                                    style={{ padding: 0, margin: 10, fontSize: 16 }}
                                />
                            </View>

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
                                    margin: 5,
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
                                        <TouchableOpacity onPress={() => this.findCoordinates()}>
                                            <Icon name='location-outline' size={20} color='black' />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.textContainer}>Description </Text>
                                <TextInput
                                    value={this.props.activityState.description}
                                    multiline
                                    maxLength={2048}
                                    placeholder="Enter Description"
                                    placeholderTextColor="#a6a6a6"
                                    onChangeText={value => this._setDescription(value)}
                                    style={{ paddingBottom: 50, fontSize: 16 }}
                                />
                            </View>

                            {this.state.warning ? <Text style={{ marginLeft: 14 }}>Please Fill all the * fields</Text> : null}

                            <View style={styles.goContainer}>
                                <TouchableOpacity onPress={() => this._handleClick()}>
                                    <Text style={styles.goText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </TouchableWithoutFeedback>
        );
    };
};

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        paddingTop: 20,
    },

    header: {
        alignItems: 'center',
        margin: 10
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
    goContainer: {
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 8,
        marginLeft: '40%',
        marginRight: '40%'
    },
    goText: {
        color: 'black',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
});

function mapStateToProps(state) {
    return {
        activityState: state.activityReducer,
        userId: state.authReducer.userId
    };
};

function mapDispatchToProps(dispatch) {
    return {
        activityActions: bindActionCreators(createActivity, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);