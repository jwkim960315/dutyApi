import React from 'react';
import DayButtonsContainer from './DayButtonsContainer';
import FixedDaysContainer from './FixedDaysContainer';
import moment from 'moment';
import { Button } from '@material-ui/core';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = moment().add(0,'months');
        console.log(currentDate.format('YYYY-MM-DD'));

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
        return (
            <div>
                <div style={{ "display": "inline", "align": "center" }}>
                    <h1 style={{ "textAlign": "center" }}>
                        <Button className="prevMonth" onClick={this.onClick} style={{ "marginRight": "15px" }}>&lt;</Button>
                        {`${this.state.currentDate.year()}-${this.state.currentDate.format('MMMM')}`}
                        <Button className="nextMonth" onClick={this.onClick} style={{ "marginLeft": "15px" }}>&gt;</Button>
                    </h1>
                </div>

                <div style={{ "textAlign": "center" }}>
                    <FixedDaysContainer />
                    <DayButtonsContainer currentDate={this.state.currentDate} />
                </div>

            </div>

            );
    }
}

export default Calendar;