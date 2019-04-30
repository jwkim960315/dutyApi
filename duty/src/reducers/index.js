import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import dutyDateUserDicReducer from './dutyDateUserDicReducer';

export default combineReducers({
    modal: modalReducer,
    dutyDateUserDic: dutyDateUserDicReducer
});