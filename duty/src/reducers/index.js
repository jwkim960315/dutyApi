import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import dutyDateUserDicReducer from './dutyDateUserDicReducer';
import selectedUserReducer from './selectedUserReducer';
import { reducer as formReducer } from 'redux-form';
import createdUserReducer from './createdUserReducer';
import loggedInUserReducer from './loggedInUserReducer';
import calendarModalReducer from './calendarModalReducer';
import addedDutyDatesNumReducer from './addedDutyDatesNumReducer';
import newDutyDatesReducer from './newDutyDatesReducer';
import originalDutyDatesNumReducer from './originalDutyDatesNumReducer';
import allUsersReducer from './allUsersReducer';

export default combineReducers({
    modal: modalReducer,
    dutyDateUserDic: dutyDateUserDicReducer,
    selectedUser: selectedUserReducer,
    form: formReducer,
    createdUser: createdUserReducer,
    loggedInUser: loggedInUserReducer,
    calendarModal: calendarModalReducer,
    addedDutyDatesNum: addedDutyDatesNumReducer,
    newDutyDates :newDutyDatesReducer,
    originalDutyDatesNum: originalDutyDatesNumReducer,
    allUsers: allUsersReducer
});