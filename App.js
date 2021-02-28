import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

import Screens from './screens';

import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure();

export default function App() {
  return (
    <Provider store={store}>
      <Screens />
    </Provider >
  );
};