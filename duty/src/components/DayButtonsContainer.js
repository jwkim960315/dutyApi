import React from 'react';
import DayButtonsRowContainer from './DayButtonsRowContainer';
import moment from 'moment';

class DayButtonsContainer extends React.Component {
    
    daysMatrixGenerator() {
        let daysMatrix = [];
        let daysLst = [];
        let currentDate = this.props.currentDate;

        const firstDateOfMonth = moment(`${currentDate.year()}-${currentDate.format('MM')}-01`);

        // Check if first day of the current month is Sunday
        if (firstDateOfMonth.day() !== 0) {
            let firstDateNumInCalendar = firstDateOfMonth.day(0).date();
            let lastDateNumOfLastMonth = firstDateOfMonth.daysInMonth();

            for (let i=firstDateNumInCalendar; i <= lastDateNumOfLastMonth; i++) {
                daysLst.push(i);
            }
        }



        for (let i = 1; i <= currentDate.daysInMonth(); i++) {
            if (daysLst.length%7 === 0 && daysLst.length !== 0) {
                daysMatrix.push(daysLst);
                daysLst = [];
            }
            daysLst.push(i);
        }

        // Check if last day of the current month is Saturday
        if (daysLst.length%7 !== 0) {
            const daysLstLength = daysLst.length;
            for (let i=1; i <= 7-daysLstLength; i++) {
                daysLst.push(i);
            }
        }

        daysMatrix.push(daysLst);
        return daysMatrix;
    }

    render() {
        const daysMatrix = this.daysMatrixGenerator();

        return daysMatrix.map((weekItems,i) => {
            return <DayButtonsRowContainer key={i} weekItems={weekItems} />;
        });
    }
}

export default DayButtonsContainer;