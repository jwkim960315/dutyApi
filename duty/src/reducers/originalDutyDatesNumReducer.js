export default (state=0, action) => {
    switch(action.type) {
        case 'INCREMENT_ORIGINAL_DUTY_DATES_NUM':
            return action.payload + 1;
        case 'DECREMENT_ORIGINAL_DUTY_DATES_NUM':
            return action.payload - 1;
        default:
            return state;
    }
}