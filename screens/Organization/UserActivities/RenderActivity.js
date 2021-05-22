import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';

import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";
import { Rating } from 'react-native-elements'
import OrganizationApi from '../../../util/organizationApi';
import styles from '../../../util/activitiesStyle';

class RenderActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            volunteerList: []
        }
    }

    onPressModal() {
        OrganizationApi.getVolunteers(this.props.item._id)
            .then(list => {
                this.setState({
                    volunteerList: list.volunteers
                })
            })
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
                                    <View style={styles.mainView}>
                                        <Text style={styles.titleText}>Schedule</Text>
                                        {
                                            this.props.item.slots.map((day, index) => {
                                                return <View key={days[index]} style={styles.dayView}>
                                                    <Text style={styles.dayText}>{days[index]}</Text>
                                                    <View style={{ flexDirection: 'column', paddingRight: 100 }}>
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
                                    </View>

                                    {this.props.Completed && this.state.volunteerList.length > 0 ?
                                        <View style={styles.mainView}>
                                            <Text style={styles.titleText}>Volunteer Rating</Text>
                                            <View>
                                                {this.state.volunteerList.map(
                                                    (element, index) => {
                                                        let value = element.activities.find(temp => temp.id == this.props.item._id);
                                                        return (
                                                            <View key={element._id} style={index == 0 ? styles.ratingView : { ...styles.ratingView, borderTopWidth: 1, borderColor: 'black' }}>
                                                                <Text style={{ fontSize: 18, fontWeight: "normal" }}>{element.name}</Text>
                                                                <Rating
                                                                    imageSize={25}
                                                                    startingValue={value.rating}
                                                                    onFinishRating={rating => {
                                                                        OrganizationApi.rateVolunteer({
                                                                            activityId: this.props.item._id,
                                                                            volunteerId: element._id,
                                                                            rating
                                                                        })
                                                                    }}
                                                                />
                                                            </View>
                                                        )
                                                    }
                                                )}
                                            </View>
                                        </View>
                                        : null}
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
    };
};

function mapDispatchToProps(dispatch) {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderActivity);