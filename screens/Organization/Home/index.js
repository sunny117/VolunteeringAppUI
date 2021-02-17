import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Image
                                style={styles.iconSmall}
                                source={require('../../../images/menu.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{alignSelf: 'center'}}> Organization Home Page !! </Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 100,
    },
    menu: {
        marginTop: 50,
        marginLeft: 20
    },
    iconSmall: {
        width: 30,
        height: 30
    },
});

function mapStateToProps(state) {
    return {

    };
};

function mapDispatchToProps(dispatch) {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);