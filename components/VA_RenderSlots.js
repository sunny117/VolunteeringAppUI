import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';

import { VA_Button } from '../components/VA_Button'
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import * as createActivity from '../store/Actions/createActivity'
import * as authActions from '../store/Actions/authActions';

const listTimings = slots => {
    let cnt = 0;
    return (
        slots.map(item => {
            return (
                <View style={{ flexDirection: "row" }} key={cnt++}>
                    <Text style={styles.textStyle}>{item.start}</Text>
                    <Text style={styles.textStyle}> - </Text>
                    <Text style={styles.textStyle}>{item.end}</Text>
                </View>
            )
        })
    )
}

class RenderSlots extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startHour: "",
            startMinute: "",
            endHour: "",
            endMinute: ""
        }
    }

    _addSlot = (day, payload) => { this.props.activityActions.setSlot(day, payload) }
    _setVisible = (day, payload) => { this.props.activityActions.setSlotVisibility(day, payload) }
    _resetState = () => {
        this.setState({
            startHour: "",
            startMinute: "",
            endHour: "",
            endMinute: ""
        })
    }

    render() {
        return (
            this.props.activityState.slots.map(item => {
                return (
                    <View style={item.isAvailable ? null : { opacity: 0.4, backgroundColor: '#B5B6B9' }} key={item.name}>
                        <View style={item.name == "Saturday" ? styles.cardContainerBottom : styles.cardContainer} >
                            <Modal
                                animationType='none'
                                visible={item.isVisible}
                                transparent={true}
                                onRequestClose={() => this.setState({ modalVisible: false })}
                            >
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalView}>
                                        <View style={styles.durationContainer}>
                                            <Text style={{...styles.textContainer, flex: 1}}>From </Text>
                                            <View style={{ flex: 2, ...styles.durationContainer }}>
                                                <TextInput
                                                    value={this.state.startHour}
                                                    keyboardType='number-pad'
                                                    placeholder="hh"
                                                    onChange={({ nativeEvent }) => {
                                                        let text = nativeEvent.text
                                                        let size = text.length;
                                                        if (text.charAt(size - 1) <= 9 && text.charAt(size - 1) >= 0) {
                                                            if (text <= 23 && text >= 0) {
                                                                this.setState({ startHour: text })
                                                            }
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
                                                        let size = text.length;
                                                        if (text.charAt(size - 1) <= 9 && text.charAt(size - 1) >= 0) {
                                                            if (text <= 59 && text >= 0) {
                                                                this.setState({ startMinute: text })
                                                            }
                                                        }
                                                    }}
                                                    maxLength={2}
                                                    style={styles.inputContainer}
                                                />
                                            </View>
                                        </View>

                                        <View style={styles.durationContainer}>
                                            <Text style={{ ...styles.textContainer, flex: 1 }}>To </Text>
                                            <View style={{ flex: 2, ...styles.durationContainer}}>
                                                <TextInput
                                                    value={this.state.endHour}
                                                    keyboardType='number-pad'
                                                    placeholder="hh"
                                                    onChange={({ nativeEvent }) => {
                                                        let text = nativeEvent.text
                                                        let size = text.length;
                                                        if (text.charAt(size - 1) <= 9 && text.charAt(size - 1) >= 0) {
                                                            if (text <= 23 && text >= 0) {
                                                                this.setState({ endHour: text })
                                                            }
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
                                                        let size = text.length;
                                                        if (text.charAt(size - 1) <= 9 && text.charAt(size - 1) >= 0) {
                                                            if (text <= 59 && text >= 0) {
                                                                this.setState({ endMinute: text })
                                                            }
                                                        }
                                                    }}
                                                    maxLength={2}
                                                    style={styles.inputContainer}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ ...styles.durationContainer, justifyContent: 'space-between', marginTop: 40 }}>
                                            <VA_Button
                                                title="Cancel"
                                                onPress={() => {
                                                    this._resetState();
                                                    this._setVisible(item.name, false)
                                                }}
                                                textStyle={{ fontSize: 16, fontWeight: "700" }}
                                            />
                                            <VA_Button
                                                title="Ok"
                                                onPress={() => {
                                                    this._resetState();
                                                    if (this.state.startHour && this.state.endHour && this.state.startMinute && this.state.endMinute) {
                                                        this._addSlot(item.name, {
                                                            start: (this.state.startHour.length == 1 ? "0" + this.state.startHour : this.state.startHour) + ":" + (this.state.startMinute.length == 1 ? "0" + this.state.startMinute : this.state.startMinute),
                                                            end: (this.state.endHour.length == 1 ? "0" + this.state.endHour : this.state.endHour) + ":" + (this.state.endMinute.length == 1 ? "0" + this.state.endMinute : this.state.endMinute)
                                                        })
                                                    } else {
                                                        this.props.dialogActions.setDialog("All fields were not provided")
                                                        this.props.dialogActions.setDialogVisibility(true)
                                                        setTimeout(() => {
                                                            this.props.dialogActions.setDialogVisibility(false);
                                                        }, 3000)
                                                    }

                                                    this._setVisible(item.name, false)
                                                }}
                                                textStyle={{ fontSize: 16, fontWeight: "700" }}
                                            />
                                        </View>
                                    </View>
                                </View>

                            </Modal>
                            {item.isAvailable ?
                                <TouchableOpacity onPress={() => { this._setVisible(item.name, true) }}>
                                    <Icon name="add-circle" size={40} color="#1a75ff" />
                                </TouchableOpacity> :
                                <TouchableWithoutFeedback>
                                    <Icon name="add-circle" size={40} color="#1a75ff" />
                                </TouchableWithoutFeedback>
                            }


                            <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 40, paddingTop: 12 }}>{item.name}</Text>

                            <View style={styles.timingsView}>
                                {listTimings(item.values)}
                            </View>
                        </View>
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
        alignItems: 'flex-start',
        padding: 5,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#D2CECD'
    },

    cardContainerBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        padding: 5,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "#00000033",
        justifyContent: 'center'
    },

    modalView: {
        margin: 20,
        marginHorizontal: 50,
        padding: 30,
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

    timingsView: {
        paddingLeft: 100,
        paddingTop: 10,
    },

    textStyle: {
        fontSize: 16,
        fontWeight: '600'
    }

});

function mapStateToProps(state) {
    return {
        activityState: state.activityReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        activityActions: bindActionCreators(createActivity, dispatch),
        dialogActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderSlots);