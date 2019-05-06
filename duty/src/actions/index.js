import axios from 'axios';

export const toggleModal = () => {
    return { type: 'TOGGLE_MODAL', payload: null };
};

export const getUser = user => {
    return { type: 'GET_USER', payload: user };
};

export const getUsers = currentDate => async dispatch => {
    const { data } = await axios.get(`/api/home?currentDateISOString=${currentDate.toISOString()}`);
    dispatch({ type: 'GET_USERS', payload: data });
};

export const createUser = (userInfo,callback) => async dispatch => {
    const { data } = await axios.post('/api/createUser', userInfo);
    dispatch({ type: 'CREATE_USER', payload: null });
    callback();
}

export const getLoggedInUser = () => async dispatch => {
    const { data } = await axios.get('/api/current_user');
    dispatch({ type: 'GET_LOGGED_IN_USER', payload: data });
};

export const toggleCalendarModal = () => {
    return { type: 'TOGGLE_CALENDAR_MODAL', payload: null };
};