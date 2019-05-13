export default (state=[],action) => {
    if (action.type === 'ADD_NEW_DUTY_DATES') {
        return action.payload;
    }

    return state;
}