import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { toggleModal } from '../actions';

import styles from '../css/DayButtonCSS';



class DayButton extends React.Component {
    onClick = () => {
        this.props.toggleModal();
    }

    render() {
        const { classes } = this.props;
        const { date, user } = this.props.item;
        const fullName = (user) ? `${user.name.lastName}${user.name.firstName}` : '_____';

        return (
            <Button onClick={this.onClick} color="primary" className={classes.button}>
                <div>{date.format('MM-DD')}</div>
                <div>{fullName}</div>
            </Button>
        );
    }
}

const mapStateToProps = ({modal}) => {
    return {modal};
};

const DayButtonWithStyles = withStyles(styles)(DayButton);

export default connect(mapStateToProps,{
    toggleModal
})(DayButtonWithStyles);