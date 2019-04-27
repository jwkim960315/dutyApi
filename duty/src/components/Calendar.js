import React from 'react';
import DayButtonsContainer from './DayButtonsContainer';
import FixedDaysContainer from './FixedDaysContainer';
import moment from 'moment';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        let currentDate = moment().add(0,'months');
        console.log(currentDate.format('YYYY-MM-DD'));

        this.state = {
            currentDate,
            currentMonth: currentDate.format('MMMM')
        }
    }

    render() {

        return (
            <div>
                <h1 style={{ "textAlign": "center" }}>{this.state.currentMonth}</h1>
                <div style={{ "textAlign": "center" }}>
                    <FixedDaysContainer />
                    <DayButtonsContainer currentDate={this.state.currentDate}/>
                </div>

            </div>

            );
    }
}

export default Calendar;