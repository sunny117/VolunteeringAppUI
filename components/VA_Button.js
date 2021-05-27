import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native'

export const VA_Button = props => {
    return (
        <TouchableNativeFeedback onPress={props.onPress} style={styles.mainContainer}>
            <View style={{...styles.button, ...props.buttonStyle}}>
                <Text style={{...styles.text, ...props.textStyle}}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({

    mainContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        backgroundColor:"#208FF4",
        alignSelf: "center",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 6
    },

    text: {
        fontSize: 20,
        fontWeight: "700",
        color: '#fff'
    }
})