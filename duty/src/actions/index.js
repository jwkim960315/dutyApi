import axios from 'axios';

export const toggleModal = () => {
    return { type: 'TOGGLE_MODAL', payload: null }
};

export const getUsers = (currentDate) => async dispatch => {
    const { data } = await axios.get(`/api/home?currentDateISOString=${currentDate.toISOString()}`);
    dispatch({ type: 'GET_USERS', payload: data });
};