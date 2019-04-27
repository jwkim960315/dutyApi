import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from '../css/FixedDaysContainerCSS';

class FixedDaysContainer extends React.Component {
    fixedDaysLstGenerator = (classes) => {
        let lst = ['SUN','MON','TUES','WED','THURS','FRI','SAT'];

        return lst.map((fixedDay,i) => {
            if (fixedDay === 'SAT') {
                return <Button key={i} disabled
                               className={classes.satButton}>{fixedDay}</Button>;
            } else if (fixedDay === 'SUN') {
                return <Button key={i} disabled
                               className={classes.sunButton}>{fixedDay}</Button>;
            }
            return <Button key={i} disabled className={classes.weekDayButton}>{fixedDay}</Button>;
        });
    }

    render() {
        const { classes } = this.props;

        return this.fixedDaysLstGenerator(classes);
    }
}

export default withStyles(styles)(FixedDaysContainer);