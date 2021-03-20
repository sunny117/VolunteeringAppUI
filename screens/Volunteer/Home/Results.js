import React from 'react';
import {
    View, Text,
    TouchableWithoutFeedback,
    FlatList, TouchableOpacity
} from 'react-native';

import RenderActivity from '../../../components/RenderActivity';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class Results extends React.Component {
    constructor(props) {
        super(props);
    };

    renderActivity = ({ item }) => {
        return (
            <RenderActivity item={item} />
        );
    };

    noResults = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 200 }}>
                <Text style={{ color: 'blue' }}>No Results found for your search!!</Text>
                <Text style={{ color: 'blue' }}>Please Try Again</Text>
            </View>
        );
    };

    onPressFilters = () => {
        this.props.navigation.navigate("Search");
    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={{ flex: 1 }}>
                    {/* {this.props.searchActivityResults === null || this.props.searchActivityResults == undefined || this.props.searchActivityResults.length === 0 ?
                        this.noResults()
                        :
                        <View onStartShouldSetResponder={() => true} style={{ flex: 1 }}>
                            <FlatList
                                data={this.props.searchActivityResults}
                                renderItem={this.renderActivity}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    } */}
                    <TouchableOpacity onPress={() => this.onPressFilters()} style={{ justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: 'white', justifyContent: 'center', padding: 10, flexDirection: 'row' }} >
                            <Icon name="filter" size={20} color={'blue'} />
                            <Text style={{ color: 'blue' }}> Go back to Search</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        );
    };
};


function mapStateToProps(state) {
	return {
		// activityState: state.searchActivity
	};
};

function mapDispatchToProps(dispatch) {
	return {
		// activityActions: bindActionCreators(searchActivity, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);