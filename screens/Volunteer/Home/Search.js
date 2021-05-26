import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Button, TouchableOpacity } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { VA_DropDown } from '../../../components/VA_DropDown'
import { VA_Location } from '../../../components/VA_Location'
import { VA_DatePicker } from '../../../components/VA_DatePicker';
import * as searchActivity from '../../../store/Actions/searchActivity'
import * as authActions from '../../../store/Actions/authActions';
import volunteerApi from '../../../util/volunteerApi'
import { CurrentLocation } from '../../../util/currentLocation'
import LoadingScreen from '../../../components/LoadingScreen';
import LinearGrad from '../../../components/LinearGrad';

import Icon from 'react-native-vector-icons/Ionicons';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.locRef = React.createRef()
    };

    _setType = value => { this.props.activityActions.setType(value) }

    _setLocation = (address, longitude, latitude) => { this.props.activityActions.setLocation(address, longitude, latitude) }

    _setStartDate = value => { this.props.activityActions.setStartDate(value) }

    _setEndDate = value => { this.props.activityActions.setEndDate(value) }

    _handleClick = () => {

        volunteerApi.searchActivity(
            {
                type: this.props.activityState.type,
                startDate: this.props.activityState.startDate,
                endDate: this.props.activityState.endDate,
                location: {
                    address: this.props.activityState.address,
                    latitude: this.props.activityState.latitude,
                    longitude: this.props.activityState.longitude
                }
            }
        )
            .then(response => {
                this.props.activityActions.addActivities(response.activities)
                this.props.navigation.navigate('Results')
            })
            .catch(err => {
                console.log(err)
                this.props.dialogActions.setDialog("Something went wrong.. not able to retreive activities :(")
                this.props.dialogActions.setDialogVisibility(true)
                setTimeout(() => {
                    this.props.dialogActions.setDialogVisibility(false);
                }, 3000)
            })

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
                    <LinearGrad />
                    {this.props.isLoading && <LoadingScreen />}
                    <View style={styles.header}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}> Find an Activity </Text>
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
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => this._handleClick()}>
                            <Icon name='checkmark-done-outline' size={45} color='white' />
                        </TouchableOpacity>
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
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 5,
        color: '#48ADF1'
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
        activityState: state.searchActivity
    };
};

function mapDispatchToProps(dispatch) {
    return {
        activityActions: bindActionCreators(searchActivity, dispatch),
        dialogActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);