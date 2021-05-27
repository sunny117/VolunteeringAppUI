import React from 'react';
import {
    View, Text,
    TouchableWithoutFeedback,
    FlatList, TouchableOpacity
} from 'react-native';

import RenderActivity from './RenderActivity';
import Icon from 'react-native-vector-icons/Ionicons';
import * as searchActivity from '../../../store/Actions/searchActivity';
import * as authActions from '../../../store/Actions/authActions';
import volunteerApi from '../../../util/volunteerApi'
import LinearGrad from '../../../components/LinearGrad';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class Results extends React.Component {
    constructor(props) {
        super(props);
    };

    renderActivity = ({ item }) => {
        return (
            <RenderActivity item={item} refreshCallback={this.refresh} />
        );
    };

    noResults = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
                <Text style={{ color: 'white' }}>No Results found for your search!!</Text>
                <Text style={{ color: 'white' }}>Please Try Again</Text>
            </View>
        );
    };

    onPressFilters = () => {
        this.props.navigation.navigate("Search");
    }

    refresh = () => {

        volunteerApi.searchActivity(
            {
                type: this.props.activityState.type,
                startDate: this.props.activityState.startDate,
                endDate: this.props.activityState.endDate,
                location: {
                    address: this.props.activityState.address,
                    latitude: this.props.activityState.latitude,
                    longitude: this.props.activityState.longitude
                }
            }
        )
            .then(response => {
                this.props.activityActions.addActivities(response.activities)
            })
            .catch(err => {
                console.log(err)
                this.props.dialogActions.setDialog("Something went wrong.. not able to retreive activities :(")
                this.props.dialogActions.setDialogVisibility(true)
                setTimeout(() => {
                    this.props.dialogActions.setDialogVisibility(false);
                }, 3000)
            })

    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={{ flex: 1 }}>
                    <LinearGrad />
                    {!this.props.activityState.activities || this.props.activityState.activities.length === 0 ?
                        this.noResults()
                        :
                        <View onStartShouldSetResponder={() => true} style={{ flex: 1 }}>
                            <FlatList
                                data={this.props.activityState.activities}
                                renderItem={this.renderActivity}
                                keyExtractor={item => item._id}
                            />
                        </View>
                    }
                    <TouchableOpacity onPress={() => this.onPressFilters()} style={{ justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center', padding: 10, flexDirection: 'row' }} >
                            <Icon name="filter" size={20} color={'#48ADF1'} />
                            <Text style={{ color: '#48ADF1' }}> Go back to Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    };
};


function mapStateToProps(state) {
    return {
        activityState: state.searchActivity
    };
};

function mapDispatchToProps(dispatch) {
    return {
        activityActions: bindActionCreators(searchActivity, dispatch),
        dialogActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);