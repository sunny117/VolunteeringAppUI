import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';

import volunteerApi from '../../../util/volunteerApi'
import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../../util/activitiesStyle';
import { connect } from "react-redux";
import { VA_Button } from '../../../components/VA_Button';
import LinearGrad from '../../../components/LinearGrad';

class RadioButton extends React.Component {
    render() {
        return (
            <View style={[{
                height: 18,
                width: 18,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: this.props.grey ? 'grey' : '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }, this.props.style]}>
                {
                    this.props.selected == 1 ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: this.props.grey ? 'grey' : '#000',
                        }} />
                        : null
                }
            </View>
        );
    }
}

class RenderActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            showJoin: true,
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            slotsAvailable: [],
            daysAvailable: [0, 0, 0, 0, 0, 0, 0]
        }
    }

    handleClick() {
        let slots = [];
        let flag = false;
        this.state.slotsAvailable.forEach(value0 => {
            let slot = [];
            value0.forEach(value1 => {
                if (value1.selected) {
                    flag = true;
                    slot.push({ "start": value1.start, "end": value1.end });
                }
            })
            slots.push(slot);
        });

        if (flag == false) return;

        volunteerApi.joinActivity({
            volunteerId: this.props.volunteerId,
            activityId: this.props.item._id,
            slotSelected: slots
        }).then(response => {
            this.props.refreshCallback();
            console.log("You have been added to the activity successfully!!");
        }).catch(error => {
            console.log("Something went wrong.. not able to join the activity :(");
        })
    }

    slotSelection(index, index1) {

        const slots = this.state.slotsAvailable[index];
        let x = [];
        if (slots) {
            x = slots.map((value, index2) => {
                if (index2 == index1) {
                    return {
                        ...value,
                        "selected": value.selected == 0 ? 1 : 0
                    };
                }
                return value
            })
        }
        let y = this.state.slotsAvailable;
        y[index] = [...x];
        this.setState({ slotsAvailable: [...y] });
    }

    renderEachSlot(slot, index) {
        return (
            <View key={index}
                pointerEvents={this.state.daysAvailable[index] ? "auto" : "none"}
                style={styles.dayView}>
                <View style={{ flex: 1 }}>
                    <Text style={this.state.daysAvailable[index] ? styles.dayText : { ...styles.dayText, color: "#bab9b8" }}>{this.state.days[index]}</Text>
                </View>
                <View style={{ flex: 1.5 }}>
                    {slot.length > 0 ? slot.map((item, index1) => {
                        return (
                            <TouchableOpacity key={index1} onPress={() => this.slotSelection(index, index1)}>
                                <View style={{ paddingLeft: 10, flexDirection: 'row', paddingRight: 60, alignItems: 'center' }} >
                                    <View>
                                        <RadioButton selected={item.selected} grey={!this.state.daysAvailable[index]} />
                                    </View>
                                    <Text style={this.state.daysAvailable[index] ? { fontSize: 15, paddingLeft: 10 } : { color: 'grey', paddingLeft: 10, fontSize: 15 }}>{item.start} - {item.end}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }) : <Text style={{ ...styles.slotText, color: "#bab9b8", paddingRight: 60 }}>**  No Slots  **</Text>}
                </View>
            </View>
        )
    }

    compareDates(date1, date2) {
        if (date1.getFullYear() < date2.getFullYear()) {
            return 1;
        }
        else if (date1.getFullYear() > date2.getFullYear()) {
            return 0;
        }
        else {
            if (date1.getMonth() < date2.getMonth()) {
                return 1;
            }
            else if (date1.getMonth() > date2.getMonth()) {
                return 0;
            }
            else {
                if (date1.getDate() > date2.getDate()) {
                    return 0;
                }
                else {
                    return 1;
                }
            }
        }
    }

    setDaysAvailable() {
        let startDateParts = this.props.item.startDate.split('-');
        let startDateObject = new Date(startDateParts[0], startDateParts[1] - 1, startDateParts[2]);

        let todayDateObject = new Date();
        if (+todayDateObject > +startDateObject) {
            startDateObject = new Date();
        }

        let endDateParts = this.props.item.endDate.split('-');
        let endDateObject = new Date(endDateParts[0], endDateParts[1] - 1, endDateParts[2]);
        let daysAvailable = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 7; i++) {
            let presentDateObject = new Date();
            presentDateObject.setDate(startDateObject.getDate() + i);
            if (this.compareDates(presentDateObject, endDateObject)) {
                daysAvailable[presentDateObject.getDay()] = 1;
            }
            else {
                break;
            }
        }
        this.setState({ "daysAvailable": daysAvailable })
    }

    onPressModal() {
        this.setDaysAvailable();
        this.setState({ modalVisible: true })
        let slots = [];
        this.props.item.slots.forEach(value0 => {
            let slot = [];
            value0.forEach(value1 => {
                slot.push({ "start": value1.start, "end": value1.end, "selected": 0 });
            })
            slots.push(slot);
        });
        this.setState({ slotsAvailable: slots });
    };

    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.onPressModal()}>
                    <View>
                        <Card>
                            <View style={styles.mainView}>
                                <Text style={styles.titleText}>Heading</Text>
                                <Text style={styles.valueText}>{this.props.item.heading}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.mainView}>
                                    <Text style={styles.titleText}>Type</Text>
                                    <Text style={styles.valueText}>{this.props.item.type}</Text>
                                </View>
                                <View style={styles.mainView}>
                                    <Text style={styles.titleText}>Volunteers Joined</Text>
                                    <Text style={styles.valueText}>{this.props.item.volunteers.length}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.mainView}>
                                    <Text style={styles.titleText}>Start</Text>
                                    <Text style={styles.valueText}>{this.props.item.startDate}</Text>
                                </View>
                                <View style={styles.mainView}>
                                    <Text style={styles.titleText}>End</Text>
                                    <Text style={styles.valueText}>{this.props.item.endDate}</Text>
                                </View>
                            </View>

                        </Card>
                    </View>
                </TouchableWithoutFeedback>
                <Modal visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}>
                    <View style={{ flex: 1 }}>
                        <LinearGrad />
                        <ScrollView>
                            <View>
                                <Card style={{ marginTop: 50 }}>
                                    <View style={styles.mainView}>
                                        <Text style={styles.titleText}>Heading</Text>
                                        <Text style={styles.valueText}>{this.props.item.heading}</Text>
                                    </View>
                                    <View style={styles.mainView}>
                                        <Text style={styles.titleText}>Type</Text>
                                        <Text style={styles.valueText}>{this.props.item.type}</Text>
                                    </View>
                                    <View style={styles.mainView}>
                                        <Text style={styles.titleText}>Volunteers Joined</Text>
                                        <Text style={styles.valueText}>{this.props.item.volunteers.length}</Text>
                                    </View>
                                    <View style={styles.mainView}>
                                        <Text style={styles.titleText}>Address</Text>
                                        <Text style={styles.valueText}>{this.props.item.location.address}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.mainView}>
                                            <Text style={styles.titleText}>Start</Text>
                                            <Text style={styles.valueText}>{this.props.item.startDate}</Text>
                                        </View>
                                        <View style={styles.mainView}>
                                            <Text style={styles.titleText}>End</Text>
                                            <Text style={styles.valueText}>{this.props.item.endDate}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.mainView}>
                                        <Text style={styles.titleText}>Description</Text>
                                        {this.props.item.description == "" ?
                                            <Text style={{ ...styles.valueText, color: '#bab9b8' }}>** No info specified **</Text> :
                                            <Text style={styles.valueText}>{this.props.item.description}</Text>
                                        }
                                    </View>
                                    <View style={styles.mainView}>
                                        <Text style={{ ...styles.titleText }}>Select Slots</Text>
                                        {this.state.slotsAvailable.map((item, index) => this.renderEachSlot(item, index))}

                                    </View>
                                    <View>
                                        {!this.props.item.volunteers.includes(this.props.volunteerId) ?
                                            <VA_Button
                                                title="Join"
                                                onPress={e => {
                                                    this.handleClick();
                                                }}
                                                buttonStyle={{ marginVertical: 20 }}
                                                textStyle={{ fontWeight: "bold", fontSize: 16 }}
                                            /> : <VA_Button
                                                title="Joined"
                                                onPress={e => {

                                                }}
                                                buttonStyle={{ marginVertical: 20, backgroundColor: 'grey' }}
                                                textStyle={{ fontWeight: "bold", fontSize: 16 }} />}
                                    </View>
                                </Card>
                            </View>
                        </ScrollView>
                        <View style={styles.imageText}>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: false })} >
                                <Icon name='arrow-back-outline' size={30} color='white' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

function mapStateToProps(state) {
    return {
        volunteerId: state.authReducer.userId
    };
};

function mapDispatchToProps(dispatch) {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderActivity);