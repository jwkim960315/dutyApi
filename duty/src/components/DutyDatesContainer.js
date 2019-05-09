import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import styles from '../css/DutyDatesContainerCSS';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { Field } from 'redux-form';
import { getLoggedInUser, toggleCalendarModal } from '../actions';




class DutyDatesContainer extends React.Component {
    state = {
        extraDutyDatesLstLength: 0
    }

    onAddClick = () => {
        this.setState({ extraDutyDatesLstLength: this.state.extraDutyDatesLstLength+1 });
    }

    renderDutyDateButtons = () => {
        if (this.props.loggedInUser) {
            const { dutyDates } = this.props.loggedInUser;
            let dutyDatesLst = [];
            if (dutyDates !== null) {
                // rendering existing duty dates
                dutyDatesLst = dutyDates.map((dutyDate,i) => {
                    return <Button key={i}>{moment(dutyDate).format('YYYY-MM-DD')}</Button>;
                });
            }

            // rendering TextField for duty dates
            for (let i=0; i < this.state.extraDutyDatesLstLength;i++) {
                console.log(i);
                dutyDatesLst.push(<Field name={`dutyDate${i}`} label="Duty Date" key={`duty-dates-${i+dutyDatesLst.length}`} onClick={this.onAddClick} component={this.props.renderTextField} />);
            }

            // rendering add button
            dutyDatesLst.push(<Button key={dutyDatesLst.length} onClick={this.onAddClick}>+</Button>);

            return dutyDatesLst;
        } else {
            // data has not been loaded;
            return null;
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