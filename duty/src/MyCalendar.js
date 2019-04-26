import React, { Component } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

class MyCalendar extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    onClickDay = value => alert(moment(value).format('YYYY-MM-DD'));

    render() {
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    onClickDay={this.onClickDay}
                />
            </div>
    );
    }
}

export default MyCalendar;