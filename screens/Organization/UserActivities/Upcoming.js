import React from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';
import RenderActivity from './RenderActivity';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as authActions from '../../../store/Actions/authActions';
import LoadingScreen from '../../../components/LoadingScreen';
import LinearGrad from '../../../components/LinearGrad';

class Upcoming extends React.Component {
    constructor(props) {
        super(props);
    };

    noResults = () => {
        return (
            <View style={{ alignItems: 'center', marginTop: 200 }}>
                <Text style={{ color: 'white' }}>No Activities!!</Text>
            </View>
        );
    };

    renderActivity = ({ item }) => {
        return (
            <RenderActivity item={item} />
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGrad isOrg={true} />
                {this.props.isLoading && <LoadingScreen />}
                {this.props.upcomingActivities === null || this.props.upcomingActivities == undefined || this.props.upcomingActivities.length === 0 ?
                    this.noResults()
                    :
                    <View onStartShouldSetResponder={() => true}>
                        <FlatList
                            data={this.props.upcomingActivities}
                            renderItem={this.renderActivity}
                            keyExtractor={item => item._id}
                        />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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