import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearGrad = (props) => {
    return (
        <LinearGradient
            colors={props.colors}
            style={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute'
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        />
    );
};

export default LinearGrad;