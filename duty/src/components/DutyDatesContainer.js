import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import styles from '../css/DutyDatesContainerCSS';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { getLoggedInUser, toggleCalendarModal } from '../actions';




class DutyDatesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    // showCalendarModal = event => {
    //     this.props.toggleCalendarModal();
    // }

    renderDutyDateButtons = () => {
        if (this.props.loggedInUser) {
            // console.log(this.props.loggedInUser);
            const { dutyDates } = this.props.loggedInUser;
            if (dutyDates !== null) {
                return dutyDates.map((dutyDate,i) => {
                    return <Button key={i} onClick={() => this.props.toggleModal(dutyDate)}>{moment(dutyDate).format('MM-DD')}</Button>;
                });
            } else {
                return <Button onClick={this.props.toggleModal}>Add...</Button>
            }

        } else {
            console.log('not logged in');
            return <div>NO</div>
        }


    }

    render() {

        return (
            <div style={{ "display": "flex", "flexDirection": "column !important"}}>
                {this.renderDutyDateButtons()}
            </div>
        )
    }
}

const mapStateToProps = ({ loggedInUser }) => {
    return { loggedInUser };
}

const DutyDatesContainerWithCSS = withStyles(styles)(DutyDatesContainer);

export default connect(mapStateToProps,{
    getLoggedInUser,
    toggleCalendarModal
})(DutyDatesContainerWithCSS);