import { combineReducers } from 'redux';
import compReducer from './compReducer';

export default combineReducers({
    comp: compReducer,
    request: requestReducer
});