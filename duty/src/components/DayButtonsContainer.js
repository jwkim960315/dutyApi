import React from 'react';
import DayButtonsRowContainer from './DayButtonsRowContainer';

class DayButtonsContainer extends React.Component {
    render() {
        let lst = [];
        let tmpLst = [];

        for (let i = 1; i < 31; i++) {
            if (i%7 === 0) {
                lst.push(tmpLst);
                tmpLst = [];
            }
            tmpLst.push(i);
        }
        lst.push(tmpLst);

        return lst.map(weekItems => {
            return <DayButtonsRowContainer weekItems={weekItems} />;
        });
    }
}

export default DayButtonsContainer;