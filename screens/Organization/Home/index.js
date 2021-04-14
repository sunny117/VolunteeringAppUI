import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Slots from './Slots';

class Home extends React.Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <Stack.Navigator initialRouteName="Slots" headerMode="none">
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Slots" component={Slots} />
            </Stack.Navigator>
        );
    };
};

export default Home;