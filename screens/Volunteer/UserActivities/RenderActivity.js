import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Button, Alert } from 'react-native';

import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";
import VolunteerApi from '../../../util/volunteerApi';

class RenderActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    onPressModal() {
        VolunteerApi.getVolunteer(this.props.volunteerEmail)
            .then(volunteer => {
                let user = volunteer.org[0];
                let activity = user.activities.find(activity => activity.id == this.props.item._id)
                this.setState({
                    activity: activity,
                    volunteer: volunteer.org[0]
                })
            })
        this.setState({ modalVisible: true })
    };

    render() {
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.onPressModal()}>
                    <View>
                        <Card>
                            <View style={styles.valueContainer}>
                                <Text style={styles.valueHeader}>Heading</Text>
                                <Text style={styles.value}>{this.props.item.heading}</Text>
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
                                        <Text style={styles.valueHeader}>Heading</Text>
                                        <Text style={styles.value}>{this.props.item.heading}</Text>
                                    </View>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Type</Text>
                                        <Text style={styles.value}>{this.props.item.type}</Text>
                                    </View>
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Volunteers Joined</Text>
                                        <Text style={styles.value}>{this.props.item.volunteers.length}</Text>
                                    </View>
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
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Description</Text>
                                        {this.props.item.description == "" ?
                                            <Text style={{ ...styles.value, color: 'grey' }}>** No info specified **</Text> :
                                            <Text style={styles.value}>{this.props.item.description}</Text>
                                        }
                                    </View>
                                    {
                                        this.props.Completed ?
                                            <View style={styles.valueContainer}>
                                                <Text style={styles.valueHeader}>Rating</Text>
                                                {
                                                    (this.state.volunteer && this.state.activity.rating != -1) ?
                                                        <Text style={{...styles.value, color: 'black'}}>{this.state.activity.rating}</Text> :
                                                        <Text style={{ ...styles.value, color: 'grey' }}>** Not Rated Yet **</Text>
                                                }
                                            </View>
                                            : null
                                    }
                                    <View style={styles.valueContainer}>
                                        <Text style={styles.valueHeader}>Slots Selected</Text>
                                        {this.state.volunteer ?
                                            this.state.volunteer.activities.map(element => {
                                                if (element.id == this.props.item._id) {
                                                    return element.slotSelected.map((day, index) => {
                                                        return <View key={days[index]} style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                                            <Text style={styles.dayHeader}>{days[index]}</Text>
                                                            <View style={{ flexDirection: 'column', paddingRight: 160 }}>
                                                                {day.map((slot, id) => {
                                                                    return (
                                                                        <View key={id} style={{ flexDirection: 'row', }}>
                                                                            <Text style={styles.slotValues}>{slot.start}</Text>
                                                                            <Text style={styles.slotValues}>-</Text>
                                                                            <Text style={styles.slotValues}>{slot.end}</Text>
                                                                        </View>
                                                                    )
                                                                })}
                                                            </View>
                                                        </View>
                                                    })
                                                }
                                            })
                                            : null}
                                    </View>
                                </Card>
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
        fontSize: 12,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 15
    },
    dayHeader: {
        fontWeight: "bold"
    },
    slotValues: {
        paddingHorizontal: 5,
    },
    imageText: {
        position: 'absolute',
        padding: 10
    },
});

function mapStateToProps(state) {
    return {
        volunteerEmail: state.authReducer.userEmail
    };
};

function mapDispatchToProps(dispatch) {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderActivity);