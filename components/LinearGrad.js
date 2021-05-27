import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LinearGrad = (props) => {
    let org = ['#35212A','#3B55CE','#FF61BE','#FFDEF3',  ];
    let vol = ['#35212A','#3B55CE','#FF61BE','#FFDEF3',  ];
    return (
        <LinearGradient
            colors={props.isOrg ? org : vol}
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