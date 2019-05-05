import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import dutyDateUserDicReducer from './dutyDateUserDicReducer';
import selectedUserReducer from './selectedUserReducer';
import { reducer as formReducer } from 'redux-form';
import createdUserReducer from './createdUserReducer';
import loggedInUserReducer from './loggedInUserReducer';

export default combineReducers({
    modal: modalReducer,
    dutyDateUserDic: dutyDateUserDicReducer,
    selectedUser: selectedUserReducer,
    form: formReducer,
    createdUser: createdUserReducer,
    loggedInUser: loggedInUserReducer
});