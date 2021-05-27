import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';
import Results from './Results';

class Home extends React.Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <Stack.Navigator initialRouteName="Search" headerMode="none">
                <Stack.Screen name="Search" >
                    {(props) => <Search {...props} isLoading={this.props.isLoading} />}
                </Stack.Screen>
                <Stack.Screen name="Results" component={Results} />
            </Stack.Navigator>
        );
    };
};

export default Home;