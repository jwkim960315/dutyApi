import axios from 'axios';

export const toggleModal = () => {
    return { type: 'TOGGLE_MODAL', payload: null }
};

export const getUsers = (currentDate) => async dispatch => {
    // console.log(currentDate.format('YYYY-MM-DD'));
    const { data } = await axios.get(`/api/home?currentDateISOString=${currentDate.toISOString()}`);
    console.log('Action', data);
    dispatch({ type: 'GET_USERS', payload: data });
};