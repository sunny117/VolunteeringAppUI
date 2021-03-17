import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TextInput, Text, Button, Modal, Alert, TouchableOpacity } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { VA_DropDown } from '../../../components/VA_DropDown'
import { VA_Location } from '../../../components/VA_Location'
import { VA_DatePicker } from '../../../components/VA_DatePicker';
import * as createActivity from '../../../store/Actions/createActivity'
import organizationApi from '../../../util/organizationApi'

import Icon from 'react-native-vector-icons/Ionicons';

class Home extends React.Component {

    constructor(props) {
        super(props);
    };

    _setHeading = value => { this.props.activityActions.setHeading(value) }

    _setType = value => { this.props.activityActions.setType(value) }

    _setLocation = (address, longitude, latitude) => { this.props.activityActions.setLocation(address, longitude, latitude) }

    _setStartDate = value => { this.props.activityActions.setStartDate(value) }

    _setEndDate = value => { this.props.activityActions.setEndDate(value) }

    _setDescription = value => { this.props.activityActions.setDescription(value) }

    _handleClick = e => {
        if (this.props.activityState.heading
            && this.props.activityState.type
            && this.props.activityState.address
            && this.props.activityState.longitude
            && this.props.activityState.latitude
            && this.props.activityState.startDate
            && this.props.activityState.endDate) {

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
            Alert.alert(
                title = "Please Fill all the * fields"
            )
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.mainContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textContainer}>Heading * </Text>
                        <TextInput
                            defaultValue={this.props.activityState.heading}
                            maxLength={64}
                            placeholder="Enter Heading"
                            placeholderTextColor="#a6a6a6"
                            onChangeText={value => this._setHeading(value)}
                            style={{ padding: 0, marginTop: 4, fontSize: 16 }}
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
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>

                            <VA_Location
                                onSelect={(address, longitude, latitude) => {
                                    this._setLocation(address, longitude, latitude)
                                }}
                            />
                            <View style={styles.locationIcon}>
                                <TouchableOpacity>
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
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>-</Text>
                            <VA_DatePicker
                                value={this.props.activityState.endDate}
                                onChange={value => { this._setEndDate(value) }}
                                placeholder="End Date"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.textContainer}>Description </Text>
                        <TextInput
                            defaultValue={this.props.activityState.description}
                            multiline
                            maxLength={2048}
                            placeholder="Enter Description"
                            placeholderTextColor="#a6a6a6"
                            onChangeText={value => this._setDescription(value)}
                            style={{ paddingBottom: 50, fontSize: 16 }}
                        />
                    </View>

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
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 400,
        backgroundColor: '#c2d6d6'
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
        userId: state.authReducer, userId
    };
};

function mapDispatchToProps(dispatch) {
    return {
        activityActions: bindActionCreators(createActivity, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);