export default (state=null,action) => {
    if (action.type === 'GET_LOGGED_IN_USER') {
        return action.payload;
    }

    return state
}