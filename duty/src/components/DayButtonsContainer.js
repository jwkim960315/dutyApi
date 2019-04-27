import React from 'react';
import DayButtonsRowContainer from './DayButtonsRowContainer';
import moment from 'moment';

class DayButtonsContainer extends React.Component {
    render() {
        let lstOfLstOfDays = [];
        let lstOfDays = [];
        let currentDate = this.props.currentDate;
        // console.log(currentDate.year());
        // console.log(currentDate.month());
        const firstDateInMonth = moment(`${currentDate.year()}-${currentDate.format('MM')}-01`);
        console.log(firstDateInMonth.format('YYYY-MM-DD'));
        console.log(firstDateInMonth.day());
        if (firstDateInMonth.day() !== 0) {
            let firstDateInCalendar = firstDateInMonth.day(0);
            let lastDateOfLastMonth = firstDateInMonth.daysInMonth();
            console.log(firstDateInCalendar.date());

                for (let i=firstDateInCalendar.date(); i <= lastDateOfLastMonth; i++) {
                    lstOfDays.push(i);
                }
        }

        // console.log(lstOfDays);
        // console.log(firstDateInCalendar.format('YYYY-MM-DD'));



        for (let i = 1; i <= currentDate.daysInMonth(); i++) {
            if (lstOfDays.length%7 === 0 && lstOfDays.length !== 0) {
                lstOfLstOfDays.push(lstOfDays);
                lstOfDays = [];
            }
            lstOfDays.push(i);
        }


        if (lstOfDays.length%7 !== 0) {
            const lstOfDaysLength = lstOfDays.length;
            for (let i=1; i <= 7-lstOfDaysLength; i++) {
                lstOfDays.push(i);
                console.log(lstOfDays)
            }
        }
        lstOfLstOfDays.push(lstOfDays);

        return lstOfLstOfDays.map((weekItems,i) => {
            return <DayButtonsRowContainer key={i} weekItems={weekItems} />;
        });
    }
}

export default DayButtonsContainer;