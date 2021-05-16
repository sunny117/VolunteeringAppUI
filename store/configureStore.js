import { AsyncStorage } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './Reducers/authReducer';
import searchActivity from './Reducers/searchActivity';
import orgActivityReducer from './Reducers/orgActivityReducer';
import volActivityReducer from './Reducers/volActivityReducer';
import activityReducer from './Reducers/createActivity'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const appReducer = combineReducers({
    authReducer: persistReducer(persistConfig, authReducer),
    searchActivity,
    orgActivityReducer,
    volActivityReducer,
    activityReducer
});

const rootReducer = (state, action) => {
    if (action.type == "SIGNOUT_REQUEST") {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}; 

export const store = createStore(
    rootReducer
);

export const persistor = persistStore(store);