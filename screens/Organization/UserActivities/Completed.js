import React from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';
import RenderActivity from './RenderActivity';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as authActions from '../../../store/Actions/authActions';
import LoadingScreen from '../../../components/LoadingScreen';
import LinearGrad from '../../../components/LinearGrad';

class Completed extends React.Component {
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
            <RenderActivity item={item} Completed={true} />
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGrad isOrg={true} />
                {this.props.isLoading && <LoadingScreen />}
                {this.props.completedActivities === null || this.props.completedActivities == undefined || this.props.completedActivities.length === 0 ?
                    this.noResults()
                    :
                    <View onStartShouldSetResponder={() => true}>
                        <FlatList
                            data={this.props.completedActivities}
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
        completedActivities: state.orgActivityReducer.completedActivities,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Completed);