export default (state=null,action) => {
    switch(action.type) {
        case 'GET_LOGGED_IN_USER':
            return action.payload;
        case 'DELETE_DUTY_DATE':
            return action.payload;
        default:
            return state;
    }
}