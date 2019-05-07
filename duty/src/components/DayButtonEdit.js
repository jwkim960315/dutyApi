import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getUser } from '../actions';


import styles from '../css/DayButtonCSS';


class DayButtonEdit extends React.Component {
    state = {
        color: '',
        selectedDate: this.props.item.date
    }

    onClick = () => {
        // this.props.getUser(this.props.item.user);
        this.props.onDateClick(this.props.item.date);
        this.setState({ color: (this.state.color !== '') ? '' : "green" });
    }

    render() {
        const { classes } = this.props;
        const { date, user } = this.props.item;
        const fullName = (user) ? `${user.name.lastName}${user.name.firstName}` : '_____';

        return (
            <Button style={{ "backgroundColor": (this.props.item.user) ? "rgba(0,123,255,.5)" : `${this.state.color}` }} disabled={(this.props.item.user) ? true : false} onClick={this.onClick} color="primary" className={classes.button}>
                <Typography>{date.format('D')}</Typography>
                <Typography>{fullName}</Typography>
            </Button>
        );
    }
}

const mapStateToProps = ({modal}) => {
    return {modal};
};

const DayButtonEditWithStyles = withStyles(styles)(DayButtonEdit);

export default connect(null,{
    getUser
})(DayButtonEditWithStyles);