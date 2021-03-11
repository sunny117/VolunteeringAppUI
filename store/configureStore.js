import { AsyncStorage } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './Reducers/authReducer';
import sampleReducer from './Reducers/sampleReducer';
import orgActivityReducer from './Reducers/orgActivityReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const reducers = combineReducers({
    authReducer: persistReducer(persistConfig, authReducer),
    sampleReducer,
    orgActivityReducer
});

export const store = createStore(
    reducers
);

export const persistor = persistStore(store);