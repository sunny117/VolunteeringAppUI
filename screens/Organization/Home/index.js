import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Slots from './Slots';

class Home extends React.Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <Stack.Navigator initialRouteName="Main" headerMode="none">
                <Stack.Screen name="Main">
                    {(props) => <Main {...props} isLoading={this.props.isLoading} />}
                </Stack.Screen>
                <Stack.Screen name="Slots" component={Slots} />
            </Stack.Navigator>
        );
    };
};

export default Home;