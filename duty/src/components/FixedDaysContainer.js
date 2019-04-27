import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class FixedDaysContainer extends React.Component {
    render() {
        const { classes } = this.props;

        let lst = ['SUN','MON','TUES','WED','THURS','FRI','SAT'];

        return lst.map(fixedDay => {
            if (fixedDay === 'SAT') {
                return <Button style={{"font-weight": "bold", "color": "blue"}} disabled
                               className={classes.button}>{fixedDay}</Button>;
            } else if (fixedDay === 'SUN') {
                return <Button style={{"font-weight": "bold", "color": "red"}} disabled
                               className={classes.button}>{fixedDay}</Button>;
            }
            return <Button style={{"font-weight": "bold", "color": "grey"}} disabled className={classes.button}>{fixedDay}</Button>;
        });
    }
}

export default withStyles(styles)(FixedDaysContainer);