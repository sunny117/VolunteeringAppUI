import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Completed from './Completed';
import Upcoming from './Upcoming';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as volActivityActions from '../../../store/Actions/volActivityActions';
import VolunteerApi from '../../../util/volunteerApi';


class UserActivities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    };

    _setLoading = (value) => this.setState({ loading: value })

    fetchActivities() {
        this._setLoading(true);
        VolunteerApi.getActivities(this.props.userId)
            .then(response => {
                this.props.volActivityActions.setCompletedActivities(response.completedActivities);
                this.props.volActivityActions.setUpcomingActivities(response.upcomingActivities);
                this._setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        this._unsubscribeFocus = this.props.navigation.addListener('focus',() => {
            this.fetchActivities();
        });
    };

    componentWillUnmount() {
        this._unsubscribeFocus();
    }


    render() {
        const Tab = createMaterialTopTabNavigator();

        return (
            <Tab.Navigator initialRouteName="Completed"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        let color;
                        if (route.name === 'Completed') {
                            iconName = focused ? 'ribbon' : 'ribbon-outline';
                        }
                        else if (route.name === 'Upcoming') {
                            iconName = focused ? 'rocket' : 'rocket-outline'
                        }
                        return <Icon name={iconName} size={20} color={color} />;
                    },
                })}
                tabBarOptions={{
                    showIcon: true,
                    inactiveTintColor: 'gray',
                    keyboardHidesTabBar: true,
                    tabStyle: {
                        flexDirection: 'row'
                    },
                }} >
                <Tab.Screen name="Completed" >
                    {(props) => <Completed {...props} isLoading={this.state.loading} />}
                </Tab.Screen>
                <Tab.Screen name="Upcoming">
                    {(props) => <Upcoming {...props} isLoading={this.state.loading} />}
                </Tab.Screen>
            </Tab.Navigator>
        );
    };
};

function mapStateToProps(state) {
    return {
        userId: state.authReducer.userId,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        volActivityActions: bindActionCreators(volActivityActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserActivities);