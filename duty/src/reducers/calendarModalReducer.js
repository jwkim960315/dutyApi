

export default (state=false, action) => {
    switch(action.type) {
        case 'TOGGLE_CALENDAR_MODAL':
            if (!state) {
                return true;
            } else {
                return false;
            }
        default:
            return state;
    }
}