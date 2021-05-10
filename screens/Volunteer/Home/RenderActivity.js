import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Button, Alert } from 'react-native';

import volunteerApi from '../../../util/volunteerApi'
import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";

class RadioButton extends React.Component {
    render() {
        return (
            <View style={[{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
            }, this.props.style]}>
                {
                    this.props.selected == 1 ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#000',
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
            days: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"],
            slotsAvailable: []
        }
    }

    handleClick() {
        let slots = [];
        this.state.slotsAvailable.forEach(value0 => {
            let slot = [];
            value0.forEach(value1 => {
                if (value1.selected)
                    slot.push({ "start": value1.start, "end": value1.end });
            })
            slots.push(slot);
        });
        
        volunteerApi.joinActivity({
            volunteerId: this.props.volunteerId,
            activityId: this.props.item._id,
            slots
        }).then(response => {
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
            <View key={index}>
                <Text style={styles.valueHeader}>{this.state.days[index]}</Text>
                {slot.map((item, index1) => {
                    return (
                        <TouchableOpacity key={index1} onPress={() => this.slotSelection(index, index1)}>
                            <View style={{ paddingLeft: 10, flexDirection: 'row' }} >
                                <View>
                                    <RadioButton selected={item.selected} />
                                </View>
                                <Text>{item.start} - {item.end}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    onPressModal() {
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
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueHeader}>Heading</Text>
                                <Text style={styles.value}>{this.props.item.heading}</Text>
                            </View>
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueHeader}>Description</Text>
                                <Text style={styles.value}>{this.props.item.description}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.valueContainer}>
                                    <Text style={styles.valueHeader}>Type</Text>
                                    <Text style={styles.value}>{this.props.item.type}</Text>
                                </View>
                                <View style={styles.valueContainer}>
                                    <Text style={styles.valueHeader}>Volunteers Joined</Text>
                                    <Text style={styles.value}>{this.props.item.volunteers.length}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.valueContainer}>
                                    <Text style={styles.valueHeader}>Start</Text>
                                    <Text style={styles.value}>{this.props.item.startDate}</Text>
                                </View>
                                <View style={styles.valueContainer}>
                                    <Text style={styles.valueHeader}>End</Text>
                                    <Text style={styles.value}>{this.props.item.endDate}</Text>
                                </View>
                            </View>

                        </Card>
                    </View>
                </TouchableWithoutFeedback>
                <Modal visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}>
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View>
                                <Card style={{ marginTop: 50 }}>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Address</Text>
                                        <Text style={styles.value}>{this.props.item.location.address}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.valueContainer}>
                                            <Text style={styles.valueHeader}>Start</Text>
                                            <Text style={styles.value}>{this.props.item.startDate}</Text>
                                        </View>
                                        <View style={styles.valueContainer}>
                                            <Text style={styles.valueHeader}>End</Text>
                                            <Text style={styles.value}>{this.props.item.endDate}</Text>
                                        </View>
                                    </View>
                                </Card>
                                <Card>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Heading</Text>
                                        <Text style={styles.value}>{this.props.item.heading}</Text>
                                    </View>
                                </Card>
                                <Card>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Type</Text>
                                        <Text style={styles.value}>{this.props.item.type}</Text>
                                    </View>
                                </Card>
                                <Card>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Volunteers Joined</Text>
                                        <Text style={styles.value}>{this.props.item.volunteers.length}</Text>
                                    </View>
                                </Card>

                                <Card style={{ flexDirection: 'row' }}>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Description</Text>
                                        {this.props.item.description == "" ?
                                            <Text style={{ ...styles.value, color: 'grey' }}>** No info specified **</Text> :
                                            <Text style={styles.value}>{this.props.item.description}</Text>
                                        }
                                    </View>
                                </Card>
                                <Card>
                                    <View>
                                        {this.state.slotsAvailable.map((item, index) => this.renderEachSlot(item, index))}

                                    </View>
                                </Card>
                            </View>
                            <View>

                                {!this.props.item.volunteers.includes(this.props.volunteerId) && this.state.showJoin ?
                                    <View style={styles.valueContainer}>
                                        <Button
                                            title="Join Activity"
                                            onPress={e => {
                                                this.handleClick();
                                                this.setState({
                                                    showJoin: false
                                                })
                                            }}
                                        />
                                    </View> : null}
                            </View>
                        </ScrollView>
                        <View style={styles.imageText}>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: false })} >
                                <Icon name='arrow-back-outline' size={30} color='blue' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    valueContainer: {
        margin: 5,
        flex: 1
    },
    valueHeader: {
        color: "blue",
        fontSize: 10,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 15
    },
    imageText: {
        position: 'absolute',
        padding: 10
    }
});

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