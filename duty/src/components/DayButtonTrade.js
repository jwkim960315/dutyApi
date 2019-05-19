import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { toggleModal, getUser } from '../actions';


import styles from '../css/DayButtonCSS';


class DayButton extends React.Component {
    onClick = () => {
        this.props.toggleModal();
        this.props.getUser(this.props.item.user);
    }

    render() {
        const { classes } = this.props;
        const { date, user } = this.props.item;
        const fullName = (user) ? `${user.name.lastName}${user.name.firstName}` : '_____';

        return (
            <Button
                style={{ "backgroundColor" : (this.props.item.isHighlighted) ? 'green' : "" }}
                onClick={this.onClick}
                color="primary"
                className={classes.button}
                disabled={this.props.item.disabled}
            >
                <div>{date.format('D')}</div>
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
    toggleModal,
    getUser
})(DayButtonWithStyles);