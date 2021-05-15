import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Button, Alert } from 'react-native';

import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";
import { Rating } from 'react-native-elements'
import OrganizationApi from '../../../util/organizationApi';

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
                                </Card>
                                <Card>
                                    {this.state.volunteerList.length > 0 ?
                                        this.state.volunteerList.map(
                                            (element, index) => {
                                                console.log(element)
                                                let value = element.activities.find(temp => temp.id == this.props.item._id);
                                                return (
                                                    <View key={element._id} style={index == 0 ? styles.ratingView : { ...styles.ratingView, borderTopWidth: 1, borderColor: 'black' }}>
                                                        <Text>{element.name}</Text>
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
                                        )
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
    imageText: {
        position: 'absolute',
        padding: 10
    },
    ratingView: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
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