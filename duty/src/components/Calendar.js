import React from 'react';
import moment from 'moment';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import DayButtonsContainer from './DayButtonsContainer';
import FixedDaysContainer from './FixedDaysContainer';

import styles from '../css/CalendarCSS';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = moment().add(0,'months');

        this.state = {
            currentDate
        }
    }

    onClick = (event) => {
        const clickedButton = event.target.innerText;

        if (clickedButton === '>') {
            this.setState({ currentDate: this.state.currentDate.add(1, 'months') });
        } else if (clickedButton === '<') {
            this.setState({ currentDate: this.state.currentDate.subtract(1, 'months') });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.monthNavbar}>
                    <h1 className={classes.month}>
                        <Button className={classes.prevMonth} onClick={this.onClick}>&lt;</Button>
                        {`${this.state.currentDate.year()}-${this.state.currentDate.format('MMMM')}`}
                        <Button className={classes.nextMonth} onClick={this.onClick}>&gt;</Button>
                    </h1>
                </div>

                <div className={classes.dates}>
                    <FixedDaysContainer />
                    <DayButtonsContainer currentDate={this.state.currentDate} />
                </div>
            </div>
            );
    }
}

export default withStyles(styles)(Calendar);