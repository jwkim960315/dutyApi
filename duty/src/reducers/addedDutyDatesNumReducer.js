export default (state=0, action) => {
    if (action.type === 'INCREMENT_DUTY_DATES_NUM') {
        return state + 1;
    }
    return state;
}