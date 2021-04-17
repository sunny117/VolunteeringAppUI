import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, TextInput, Text, Button, Modal, Alert, TouchableOpacity, TouchableHighlightBase, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { VA_DatePicker } from '../../../components/VA_DatePicker';
import { VA_Button } from '../../../components/VA_Button'
import RenderSlots from '../../../components/VA_RenderSlots';
import * as createActivity from '../../../store/Actions/createActivity';
import organizationApi from '../../../util/organizationApi';
import conversions from '../../../util/dateTimeConversions';

class SlotsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            warning: false,
        }
    };

    _setStartDate = payload => { this.props.activityActions.setStartDate(payload) }

    _setEndDate = payload => { this.props.activityActions.setEndDate(payload) }

    _setAvailability = (id, payload) => { this.props.activityActions.setSlotAvailability(id, payload) }

    _checkSlots = () => {
        let list = this.props.activityState.slots
        let returnValue = false
        list.forEach(element => {
            if (element.values.length > 0) returnValue = true;
        })
        return returnValue;
    }

    _handleClick = e => {
        console.log("API call for creating activity", this.props.activityState.slots)
        // if (this.props.activityState.startDate
        //     && this.props.activityState.endDate
        //     && _checkSlots()
        // ) {

        //     this.setState({
        //         warning: false
        //     })

        //     organizationApi.createActivity(
        //         {
        //             organization: this.props.userId,
        //             heading: this.props.activityState.heading,
        //             type: this.props.activityState.type,
        //             startDate: this.props.activityState.startDate,
        //             endDate: this.props.activityState.endDate,
        //             location: {
        //                 address: this.props.activityState.address,
        //                 latitude: this.props.activityState.latitude,
        //                 longitude: this.props.activityState.longitude
        //             },
        //             volunteers: [],
        //             description: this.props.activityState.description
        //         }
        //     )
        //         .then(response => {
        //             this._resetState()
        //             this.locRef.current.clear()
        //             Alert.alert(
        //                 title = "Successfully created the activity!!"
        //             )
        //         })
        //         .catch(err => {
        //             console.log(err)
        //             Alert.alert(
        //                 title = "Something went wrong.. not able to create the activity :("
        //             )
        //         })
        // } else {
        //     this.setState({
        //         warning: true
        //     })
        // }
    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <KeyboardAwareScrollView>
                    <View style={styles.mainContainer} onStartShouldSetResponder={() => true}>
                        <VA_Button
                            title="back"
                            onPress={() => this.props.navigation.navigate("Main")}
                            buttonStyle={{ alignSelf: "flex-start", marginLeft: 10 }}
                            textStyle={{ fontSize: 16, fontWeight: "600" }}
                        />
                        <View style={styles.inputContainer}>
                            <Text style={styles.textContainer}>Duration * </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <VA_DatePicker
                                    date={this.props.activityState.startDate}
                                    onDateChange={value => {
                                        this._setStartDate(value);
                                        let x = this.props.activityState.startDate, y = this.props.activityState.endDate;
                                        if (x && y) {
                                            let result = conversions.DayChecker(x, y);
                                            result.forEach(x => this._setAvailability(x, true));
                                        }
                                    }}
                                    placeholder="Start Date"
                                    minDate={new Date()}
                                    maxDate={this.props.activityState.endDate ? this.props.activityState.endDate : undefined}
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>-</Text>
                                <VA_DatePicker
                                    date={this.props.activityState.endDate}
                                    onDateChange={value => {
                                        this._setEndDate(value);
                                        let x = this.props.activityState.startDate, y = this.props.activityState.endDate;
                                        if (x && y) {
                                            let result = conversions.DayChecker(x, y);
                                            result.forEach(x => this._setAvailability(x, true));
                                        }
                                    }}
                                    placeholder="End Date"
                                    minDate={this.props.activityState.startDate ? this.props.activityState.startDate : new Date()}
                                />
                            </View>
                        </View>

                        <View style={{ ...styles.inputContainer, marginTop: 24, paddingLeft: 0, paddingRight: 0 }}>
                            <Text style={{ ...styles.textContainer, padding: 12 }}>Add Slots </Text>
                            <RenderSlots />
                        </View>

                        <VA_Button title="Confirm" buttonStyle={styles.button} onPress={() => this._handleClick()} />
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        );
    };
};

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 40,
        // opacity:opacValue
    },

    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10
    },

    inputContainer: {
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

    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 36
    }
});

function mapStateToProps(state) {
    return {
        activityState: state.activityReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        activityActions: bindActionCreators(createActivity, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsScreen);