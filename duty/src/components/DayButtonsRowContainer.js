import React from 'react';

import DayButton from './DayButton';
import DayButtonEdit from './DayButtonEdit';
import DayButtonTrade from './DayButtonTrade';

class DayButtonsRowContainer extends React.Component {
    render() {
        if (this.props.page === 'UserCreateForm') {
            return (
                <div>
                    {this.props.weekItems.map((item,i) => <DayButtonEdit onDateClick={this.props.onDateClick} key={i} item={item} />)}
                </div>
            )
        } else if (this.props.page === 'TradeDutyDatesPage') {
            return (
                <div>
                    {this.props.weekItems.map((item,i) => <DayButtonTrade onDateClick={this.props.onDateClick} key={i} item={item} />)}
                </div>
            )
        }
        return (
            <div>
                {this.props.weekItems.map((item,i) => <DayButton onDateClick={this.props.onDateClick} key={i} item={item} />)}
            </div>
        );
    }
}

export default DayButtonsRowContainer;