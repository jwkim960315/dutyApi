import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    modal: modalReducer,
    users: usersReducer
});