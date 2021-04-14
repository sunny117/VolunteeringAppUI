import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';

import { VA_Button } from '../components/VA_Button'
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import * as createActivity from '../store/Actions/createActivity'

class RenderSlots extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            startHour: 0,
            startMinute: 0,
            endHour: 0,
            endMinute: 0
        }
    }

    render() {
        return (
            this.props.activityState.slots.map(item => {
                return (
                    <View style={item.name == "Saturday" ? styles.cardContainerBottom : styles.cardContainer} key={item.name}>
                        <Modal
                            animationType='none'
                            visible={this.state.modalVisible}
                            transparent={true}
                            onRequestClose={() => this.setState({ modalVisible: false })}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalView}>
                                    <View style={styles.durationContainer}>
                                        <Text style={styles.textContainer}>From </Text>
                                        <TextInput
                                            value={this.state.startHour}
                                            keyboardType='number-pad'
                                            placeholder="hh"
                                            onChange={({ nativeEvent }) => {
                                                let text = nativeEvent.text
                                                if (text <= 23 && text >= 0) {
                                                    this.setState({ startHour: text })
                                                }
                                            }}
                                            maxLength={2}
                                            style={styles.inputContainer}
                                        />
                                        <Text style={styles.textContainer}>:</Text>
                                        <TextInput
                                            value={this.state.startMinute}
                                            keyboardType='number-pad'
                                            placeholder="mm"
                                            onChange={({ nativeEvent }) => {
                                                let text = nativeEvent.text
                                                if (text <= 59 && text >= 0) {
                                                    this.setState({ startMinute: text })
                                                }
                                            }}
                                            maxLength={2}
                                            style={styles.inputContainer}
                                        />
                                    </View>

                                    <View style={styles.durationContainer}>
                                        <Text style={styles.textContainer}>To </Text>
                                        <TextInput
                                            value={this.state.endHour}
                                            keyboardType='number-pad'
                                            placeholder="hh"
                                            onChange={({ nativeEvent }) => {
                                                let text = nativeEvent.text
                                                if (text <= 23 && text >= 0) {
                                                    this.setState({ endHour: text })
                                                }
                                            }}
                                            maxLength={2}
                                            style={styles.inputContainer}
                                        />
                                        <Text style={styles.textContainer}>:</Text>
                                        <TextInput
                                            value={this.state.endMinute}
                                            keyboardType='number-pad'
                                            placeholder="mm"
                                            onChange={({ nativeEvent }) => {
                                                let text = nativeEvent.text
                                                if (text <= 59 && text >= 0) {
                                                    this.setState({ endMinute: text })
                                                }
                                            }}
                                            maxLength={2}
                                            style={styles.inputContainer}
                                        />
                                    </View>
                                    <View style={{ ...styles.durationContainer, justifyContent: 'space-between', marginTop: 40 }}>
                                        <VA_Button
                                            title="Cancel"
                                            onPress={() => this.setState({ modalVisible: false })}
                                            textStyle={{ fontSize: 16, fontWeight: "700" }}
                                        />
                                        <VA_Button
                                            title="Ok"
                                            onPress={() => this.setState({ modalVisible: false })}
                                            textStyle={{ fontSize: 16, fontWeight: "700" }}
                                        />
                                    </View>
                                </View>
                            </View>

                        </Modal>
                        <TouchableOpacity onPress={() => {
                            this.setState({ modalVisible: true })
                        }}>
                            <Icon name="add-circle" size={40} color="#1a75ff" />
                        </TouchableOpacity>

                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 40 }}>{item.name}</Text>
                    </View>
                )
            })
        );
    }
};

const styles = StyleSheet.create({

    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#D2CECD'
    },

    cardContainerBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "#0000001A",
        justifyContent: 'center'
    },

    modalView: {
        margin: 20,
        marginHorizontal: 40,
        paddingHorizontal:30,
        paddingVertical:30,
        backgroundColor: "white",
        borderRadius: 10,
    },

    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
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
        fontSize: 20,
        fontWeight: 'bold',
        padding: 5,
    },

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

export default connect(mapStateToProps, mapDispatchToProps)(RenderSlots);