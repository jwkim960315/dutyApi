

export default (state=false, action) => {
    switch(action.type) {
        case 'TOGGLE_MODAL':
            if (state === false) {
                return true;
            } else {
                return false;
            }
        default:
            return false;
    }
}