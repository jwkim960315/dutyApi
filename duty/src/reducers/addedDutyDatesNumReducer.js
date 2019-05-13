export default (state=0, action) => {
    switch(action.type) {
        case 'INCREMENT_DUTY_DATES_NUM':
            return state + 1;
        case 'DECREMENT_DUTY_DATES_NUM':
            return state - 1;
        default:
            return state;
    }
}