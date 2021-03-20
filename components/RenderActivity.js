import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from './Card';


const RenderActivity = props => {
    return (
        <Card>
            <View style={styles.valueContainer}>
                <Text style={styles.valueHeader}>Description</Text>
                <Text style={styles.value}>{props.item.description}</Text>
            </View>
            <View style={styles.valueContainer}>
                <Text style={styles.valueHeader}>Type</Text>
                <Text style={styles.value}>{props.item.type}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.valueContainer}>
                    <Text style={styles.valueHeader}>Start</Text>
                    <Text style={styles.value}>{props.item.startDate}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.valueHeader}>End</Text>
                    <Text style={styles.value}>{props.item.endDate}</Text>
                </View>
            </View>
        </Card>
    );
};

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

export default RenderActivity;