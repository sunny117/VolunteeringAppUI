import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.loading} >
            <ActivityIndicator size='large' color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        elevation: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    }
});

export default LoadingScreen;