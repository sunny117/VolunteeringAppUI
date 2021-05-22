import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Dialog = (props) => {
    console.log(props)
    return (
        <View style={styles.dialogView} >
            <Text style={styles.dialogText}>{props.value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    dialogView: {
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        right:0,
        left: 0,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: '#575753',
        padding: 5,
        margin: 10,
        borderRadius: 10
    },
    dialogText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default Dialog;