import React from 'react';
import { Modal, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { toggleCalendarModal } from '../actions';
import moment from 'moment';

import Calendar from './Calendar';

import UserModalCSS from '../css/UserModalCSS';

class CalendarModal extends React.Component {

    render() {
        const { classes } = this.props;

        // const fullName = (selectedUser) ? `${selectedUser.name.lastName}${selectedUser.name.firstName}` : 'None';
        // const company = (selectedUser) ? selectedUser.company : 'None';
        // const dutyDatesStr = (selectedUser) ? selectedUser.dutyDates.map(dutyDate => moment(dutyDate).format('YYYY-MM-DD')).join(', ') : 'None';
        console.log(this.props.calendarModal);
        return (
            <div>
                <Modal
                    aria-labelledby="user-modal-title"
                    aria-describedby="user-modal-description"
                    open={this.props.calendarModal || false}
                    onClose={this.props.toggleCalendarModal}
                >
                    <div style={UserModalCSS.getModalStyle()} className={classes.paper}>
                        <Calendar />
                        <CalendarModalWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ calendarModal, loggedInUser }) => {
    return { calendarModal, loggedInUser };
};

const CalendarModalWrapped = withStyles(UserModalCSS.styles)(CalendarModal);

export default connect(mapStateToProps,{
    toggleCalendarModal
})(CalendarModalWrapped);


