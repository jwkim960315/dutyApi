

export default (state=[], action) => {
    console.log('action', action.payload);
    switch(action.type) {
        case 'GET_USERS':
            return [...state,...action.payload];
        default:
            return state;
    }
}