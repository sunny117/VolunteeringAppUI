import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';

import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";
import VolunteerApi from '../../../util/volunteerApi';
import styles from '../../../util/activitiesStyle';
import LoadingScreen from '../../../components/LoadingScreen';

class RenderActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    onPressModal() {
        !this.state.activity ?
            VolunteerApi.getVolunteer(this.props.volunteerEmail)
                .then(volunteer => {
                    let user = volunteer.org[0];
                    let activity = user.activities.find(activity => activity.id == this.props.item._id)
                    this.setState({
                        activity: activity,
                        volunteer: volunteer.org[0]
                    })
                })
            : null
        this.setState({ modalVisible: true })
    };

    render() {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
                                    {this.state.volunteer ?
                                        <View>
                                            {this.props.Completed ?
                                                <View style={styles.mainView}>
                                                    <Text style={styles.titleText}>Rating</Text>
                                                    {
                                                        this.state.activity.rating != -1 ?
                                                            <Text style={{ ...styles.valueText, color: 'black' }}>{this.state.activity.rating}</Text> :
                                                            <Text style={{ ...styles.valueText, color: '#bab9b8' }}>** Not Rated Yet **</Text>
                                                    }
                                                </View>
                                                : null}
                                            <View style={styles.mainView}>
                                                <Text style={styles.titleText}>Slots Selected</Text>
                                                {this.state.volunteer.activities.map(element => {
                                                    if (element.id == this.props.item._id) {
                                                        return element.slotSelected.map((day, index) => {
                                                            return <View key={days[index]} style={styles.dayView}>
                                                                <View style={{ flex: 1 }}>
                                                                    <Text style={styles.dayText}>{days[index]}</Text>

                                                                </View>
                                                                <View style={{ flexDirection: 'column', flex: 1.5 }}>
                                                                    {day.length > 0 ? day.map((slot, id) => {
                                                                        return (
                                                                            <View key={id} style={{ flexDirection: 'row', }}>
                                                                                <Text style={styles.slotText}>{slot.start}</Text>
                                                                                <Text style={styles.slotText}>-</Text>
                                                                                <Text style={styles.slotText}>{slot.end}</Text>
                                                                            </View>
                                                                        )
                                                                    }) : <Text style={{ ...styles.slotText, color: "#bab9b8" }}>**No Slots**</Text>}
                                                                </View>
                                                            </View>
                                                        })
                                                    }
                                                })}
                                            </View>
                                        </View>
                                        : <LoadingScreen
                                            style={{
                                                position: 'relative',
                                                elevation: 0,
                                                backgroundColor: 'white',
                                                marginTop: 10
                                            }}
                                        />}
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