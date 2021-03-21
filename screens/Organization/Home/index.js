import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TextInput, Text, Button, Modal, Alert, TouchableOpacity, TouchableHighlightBase } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { VA_DropDown } from '../../../components/VA_DropDown'
import { VA_Location } from '../../../components/VA_Location'
import { VA_DatePicker } from '../../../components/VA_DatePicker';
import * as createActivity from '../../../store/Actions/createActivity'
import organizationApi from '../../../util/organizationApi'
import { CurrentLocation } from '../../../util/currentLocation'

import Icon from 'react-native-vector-icons/Ionicons';

class Home extends React.Component {

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

    _setStartDate = value => { this.props.activityActions.setStartDate(value) }

    _setEndDate = value => { this.props.activityActions.setEndDate(value) }

    _setDescription = value => { this.props.activityActions.setDescription(value) }

    _resetState = value => { this.props.activityActions.resetState() }

    _handleClick = e => {
        if (this.props.activityState.heading
            && this.props.activityState.type
            && this.props.activityState.address
            && this.props.activityState.longitude
            && this.props.activityState.latitude
            && this.props.activityState.startDate
            && this.props.activityState.endDate) {

            this.setState({
                warning: false
            })

            organizationApi.createActivity(
                {
                    organization: this.props.userId,
                    heading: this.props.activityState.heading,
                    type: this.props.activityState.type,
                    startDate: this.props.activityState.startDate,
                    endDate: this.props.activityState.endDate,
                    location: {
                        address: this.props.activityState.address,
                        latitude: this.props.activityState.latitude,
                        longitude: this.props.activityState.longitude
                    },
                    volunteers: [],
                    description: this.props.activityState.description
                }
            )
                .then(response => {
                    this._resetState()
                    this.locRef.current.clear()
                    Alert.alert(
                        title = "Successfully created the activity!!"
                    )
                })
                .catch(err => {
                    console.log(err)
                    Alert.alert(
                        title = "Something went wrong.. not able to create the activity :("
                    )
                })
        } else {
            this.setState({
                warning: true
            })
        }
    }

    getTodayDate() {
        let date = new Date();
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // imp to note this as it starts from 0
        let dd = date.getDate();
        return yyyy + '-' + mm + '-' + dd;
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

    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.mainContainer}>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#2196F3' }}> Create an Activity </Text>
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
                        <Text style={styles.textContainer}>Duration * </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <VA_DatePicker
                                date={this.props.activityState.startDate}
                                onDateChange={value => { this._setStartDate(value) }}
                                placeholder="Start Date"
                                minDate={this.getTodayDate()}
                                maxDate={this.props.activityState.endDate ? this.props.activityState.endDate : undefined}
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>-</Text>
                            <VA_DatePicker
                                date={this.props.activityState.endDate}
                                onDateChange={value => { this._setEndDate(value) }}
                                placeholder="End Date"
                                minDate={this.props.activityState.startDate ? this.props.activityState.startDate : this.getTodayDate()}
                            />
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

                    <View
                        style={styles.button}
                    >
                        <Button
                            title="Confirm"
                            onPress={e => {
                                this._handleClick(e)
                            }}
                        />
                    </View>
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

    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 36
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);