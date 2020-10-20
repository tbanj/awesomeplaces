/* eslint-disable prettier/prettier */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';
export const middlewares = [reduxThunk];
const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer,
    auth: authReducer,
});
let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => { return createStore(rootReducer, composeEnhancers(applyMiddleware(reduxThunk))); };

export default configureStore;

