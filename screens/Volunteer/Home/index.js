import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';
import Results from './Results';

class Home extends React.Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <Stack.Navigator initialRouteName="Search" headerMode="none">
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Results" component={Results} />
            </Stack.Navigator>
        );
    };
};

export default Home;