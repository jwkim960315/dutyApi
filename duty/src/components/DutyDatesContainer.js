import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import styles from '../css/DutyDatesContainerCSS';
import { getLoggedInUser } from '../actions';


class DutyDatesContainer extends React.Component {
    renderHelper = () => {

    }

    render() {

        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = ({ loggedInUser }) => {
    return { loggedInUser };
}

const DutyDatesContainerWithCSS = withStyles(styles)(DutyDatesContainer);

export default connect(mapStateToProps,{
    getLoggedInUser
})(DutyDatesContainerWithCSS);