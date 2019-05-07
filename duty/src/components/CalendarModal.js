import React from 'react';
import { Modal, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { toggleCalendarModal } from '../actions';
import moment from 'moment';

import Calendar from './Calendar';

import UserModalCSS from '../css/UserModalCSS';

class CalendarModal extends React.Component {
    state = {
        selectedDate: null
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    onDateClick = date => {
        console.log(date);
        this.setState({
            selectedDate: moment(date).format('YYYY-MM-DD')
        });
        console.log(this.state);
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.modalOpen);
        console.log(this.props.selectedDate);
        return (
            <div>
                <Modal
                    aria-labelledby="user-modal-title"
                    aria-describedby="user-modal-description"
                    open={this.props.modalOpen || false}
                    onClose={this.props.toggleModal}
                >
                    <div style={UserModalCSS.getModalStyle()} className={classes.paper}>
                        <Calendar onDateClick={this.onDateClick} page={"UserCreateForm"}/>
                        <div style={{ "flexDirection": "column" }}>
                            <Typography >
                                Your Duty Date: {moment(this.props.selectedDate).format('YYYY-MM-DD')}
                            </Typography>
                            <Typography >
                                Selected Date: {this.state.selectedDate || 'Not Yet Selected'}
                            </Typography>
                        </div>
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

export default connect(null,{
    toggleCalendarModal
})(CalendarModalWrapped);


