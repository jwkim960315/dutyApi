import React from 'react';
import DayButtonsRowContainer from './DayButtonsRowContainer';
import moment from 'moment';

import { connect } from 'react-redux';


class DayButtonsContainer extends React.Component {

    daysMatrixGenerator = () => {
        let daysMatrix = [];
        let daysLst = [];
        let currentDate = this.props.currentDate;
        let dutyDateUserDic = this.props.dutyDateUserDic;

        const firstDateOfMonth = moment(`${currentDate.format('YYYY-MM')}-01`);
        let loopingDate = firstDateOfMonth.clone();
        loopingDate.day(0);

        let loopingDateFormat = loopingDate.format('YYYY-MM-DD');

        // Check if first day of the current month is Sunday
        if (firstDateOfMonth.day() !== 0) {
            let firstDateNumInCalendar = firstDateOfMonth.day(0).date();
            let lastDateNumOfLastMonth = firstDateOfMonth.daysInMonth();
            for (let i=firstDateNumInCalendar; i <= lastDateNumOfLastMonth; i++) {
                if (this.props.userDutyDates) {
                    daysLst.push({
                        date: loopingDate,
                        user: dutyDateUserDic[loopingDateFormat] || null,
                        isHighlighted: this.props.userDutyDates.includes(loopingDateFormat),
                        disabled: true
                    });
                } else {
                    daysLst.push({
                        date: loopingDate,
                        user: dutyDateUserDic[loopingDateFormat] || null
                    });
                }

                loopingDate = loopingDate.clone();
                loopingDate.add(1,'days');
                loopingDateFormat = loopingDate.format('YYYY-MM-DD');
            }
        }

        for (let i = 1; i <= currentDate.daysInMonth(); i++) {
            if (daysLst.length%7 === 0 && daysLst.length !== 0) {
                daysMatrix.push(daysLst);
                daysLst = [];
            }

            if (this.props.userDutyDates) {
                daysLst.push({
                    date: loopingDate,
                    user: dutyDateUserDic[loopingDateFormat] || null,
                    isHighlighted: this.props.userDutyDates.includes(loopingDateFormat),
                    disabled: false
                });
            } else {
                daysLst.push({
                    date: loopingDate,
                    user: dutyDateUserDic[loopingDateFormat] || null
                });
            }

            loopingDate = loopingDate.clone();
            loopingDate.add(1,'days');
            loopingDateFormat = loopingDate.format('YYYY-MM-DD');
        }

        // Check if last day of the current month is Saturday
        if (daysLst.length%7 !== 0) {
            const daysLstLength = daysLst.length;
            for (let i=1; i <= 7-daysLstLength; i++) {
                if (this.props.userDutyDates) {
                    daysLst.push({
                        date: loopingDate,
                        user: dutyDateUserDic[loopingDateFormat] || null,
                        isHighlighted: this.props.userDutyDates.includes(loopingDateFormat),
                        disabled: true
                    });
                } else {
                    daysLst.push({
                        date: loopingDate,
                        user: dutyDateUserDic[loopingDateFormat] || null
                    });
                }

                loopingDate = loopingDate.clone();
                loopingDate.add(1,'days');
                loopingDateFormat = loopingDate.format('YYYY-MM-DD');
            }
        }
        daysMatrix.push(daysLst);
        return daysMatrix;
    }

    render() {
        const daysMatrix = this.daysMatrixGenerator();

        return daysMatrix.map((weekItems,i) => {
            return <DayButtonsRowContainer
                onDateClick={this.props.onDateClick}
                key={i}
                weekItems={weekItems}
                page={this.props.page}
            />;
        });
    }
}

const mapStateToProps = ({ dutyDateUserDic }) => {
    return {dutyDateUserDic};
};

export default connect(mapStateToProps)(DayButtonsContainer);