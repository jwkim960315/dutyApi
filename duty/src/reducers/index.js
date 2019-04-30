import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import dutyDateUserDicReducer from './dutyDateUserDicReducer';
import selectedUserReducer from './selectedUserReducer';

export default combineReducers({
    modal: modalReducer,
    dutyDateUserDic: dutyDateUserDicReducer,
    selectedUser: selectedUserReducer
});