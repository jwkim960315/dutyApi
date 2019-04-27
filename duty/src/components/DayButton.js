import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from '../css/DayButtonCSS';

class DayButton extends React.Component {
    render() {
        const { classes } = this.props;

        return <Button color="primary" className={classes.button}>{this.props.item}</Button>
    }
}

export default withStyles(styles)(DayButton);