import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Card from '../../../components/Card';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as authActions from '../../../store/Actions/authActions';

class Upcoming extends React.Component {
    constructor(props) {
        super(props);
    };

    noResults = () => {
        return (
            <View style={{ alignItems: 'center', marginTop: 200 }}>
                <Text style={{ color: 'blue' }}>No Activities!!</Text>
            </View>
        );
    };

    renderActivity = ({ item }) => {
        return (
            <Card>
                <View style={styles.valueContainer}>
                    <Text style={styles.valueHeader}>Description</Text>
                    <Text style={styles.value}>{this.props.item.description}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.valueHeader}>Type</Text>
                    <Text style={styles.value}>{this.props.item.activityType}</Text>
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
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.upcomingActivities === null || this.props.upcomingActivities == undefined || this.props.upcomingActivities.length === 0 ?
                    this.noResults()
                    :
                    <View onStartShouldSetResponder={() => true}>
                        <FlatList
                            data={this.props.upcomingActivities}
                            renderItem={this.renderActivity}
                            keyExtractor={item => item.id}
                        />
                    </View>
                }
            </View>
        )
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

});

function mapStateToProps(state) {
    return {
        upcomingActivities: state.orgActivityReducer.upcomingActivities,

    };
};

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upcoming);