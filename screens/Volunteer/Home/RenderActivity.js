import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Button, Alert } from 'react-native';

import volunteerApi from '../../../util/volunteerApi'
import Card from '../../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";

class RenderActivity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            showJoin: true
        }
    }

    handleClick() {
        volunteerApi.joinActivity({
            volunteerId: this.props.volunteerId,
            activityId: this.props.item._id
        }).then(response => {
            console.log(response)
            Alert.alert(
                title = "You have been added to the activity successfully!!"
            );
            this.props.refreshCallback();
        })
            .catch(error => {
                console.log(error)
                Alert.alert(
                    title = "Something went wrong.. not able to join the activity :("
                )
            })
    }

    render() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: true })}>
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
                                        
                                    </View>
                                </Card>
                            </View>
                            <View>

                                {this.props.item.volunteers.includes(this.props.volunteerId) && this.state.showJoin ?
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderActivity);