import React from 'react';
import Calendar from './Calendar';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import ArrowLeftAlt from '@material-ui/icons/ArrowLeft';
import ArrowRightAlt from '@material-ui/icons/ArrowRight';
import CompareArrows from '@material-ui/icons/CompareArrows';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import { reduxForm, Field } from 'redux-form';

import { connect } from 'react-redux';
import { getLoggedInUser } from "../actions";

import styles from '../css/TradeDutyDatesPageCSS';

class TradeDutyDatesPage extends React.Component {
    state = {
        userDutyDates: [],
        otherDutyDates: [],
        arrows: []
    }

    async componentDidMount() {
        await this.props.getLoggedInUser();

        let arrows = this.props.loggedInUser.dutyDates.map(dutyDate => "right");

        let userDutyDates = this.props.loggedInUser.dutyDates.map(dutyDate => moment(dutyDate).format('YYYY-MM-DD'));

        this.setState({
            userDutyDates,
            arrows
        })
    }


    renderDutyDates = (type,addButtonCSS) => {
        let dutyDates = this.state[`${type}DutyDates`].map((dutyDate,index) => {
            return (
                <Field
                    key={`${type}DutyDates${index}`}
                    label="Duty Date"
                    name={`${type}DutyDates${index}`}
                    onChange={e => this.onInputChange(e,index,type)}
                    component={this.renderTextField}
                    index={index}
                />)
        })

        dutyDates.push(<Button className={addButtonCSS} key="addDutyDate" onClick={() => this.onAddClick(type)}><AddIcon /></Button>);

        return dutyDates;
    }

    onInputChange = (event,index,type) => {
        let dutyDates = (type === 'user') ? this.state.userDutyDates.slice() : this.state.otherDutyDates.slice();
        console.log(event.target.value);
        console.log(dutyDates);
        console.log(index);
        dutyDates.splice(index, 1, event.target.value);

        if (type === 'user') {
            this.setState({ userDutyDates: dutyDates });
        } else {
            this.setState({ otherDutyDates: dutyDates });
        }
    }



    renderTextField = ({ input, key, dutyDate, label, index, meta: { touched, invalid, error }, ...custom }) => {
        let value = (input.name.slice(0,4) === 'user') ? this.state.userDutyDates[index] : this.state.otherDutyDates[index];
        value = moment(value).format('YYYY-MM-DD');
        return (
            <TextField
                {...input}
                label={label}
                variant="outlined"
                color="primary"
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                value={this.state[`${input.name.slice(0,4)}DutyDates`][index]}
            />)
    }

    renderDeletes = deleteCSS => {
        let deletes = [];

        for (let i=0; i < this.state.arrows.length; i++) {
            deletes.push(<Button className={deleteCSS}><DeleteIcon /></Button>)
        }

        return deletes;
    }

    renderErasers = (eraserCSS,type) => {
        let erasers = [];
        let erasersLength = (type === 'user') ? this.state.userDutyDates.length : this.state.otherDutyDates.length;

        for (let i=0; i < erasersLength; i++) {
            erasers.push(<Button className={eraserCSS}><RemoveCircle /></Button>)
        }

        return erasers;
    }

    renderArrows = arrowCSS => {
        let arrows = this.state.arrows.slice();

        return (
            arrows.map(arrow => {
                switch(arrow) {
                    case 'left':
                        return <div className={arrowCSS}><ArrowLeftAlt /></div>;
                    case 'right':
                        return <div className={arrowCSS}><ArrowRightAlt /></div>;
                    case 'both':
                        return <div className={arrowCSS}><CompareArrows /></div>;
                    default:
                        return <div className={arrowCSS}><CompareArrows /></div>;
                }
            })
        )
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.leftColumn}>
                    <div className="calendar">
                        <Calendar
                            userDutyDates={this.state.userDutyDates}
                            otherDutyDates={this.state.otherDutyDates}
                            arrows={this.state.arrows}
                        />
                    </div>
                    <div className="message">
                        <TextField
                            className={classes.message}
                            variant="filled"
                            multiline={true}
                            label="Message"
                        />
                    </div>
                </div>
                <div className={classes.rightColumn}>
                    <div className={classes.button}>
                        {this.renderDeletes(classes.deletes)}
                    </div>
                    <div className={classes.button}>
                        {this.renderErasers(classes.erasers,'user')}
                    </div>
                    <div className={classes.column}>
                        {this.renderDutyDates('user',classes.addButton)}
                    </div>
                    <div className={classes.column}>
                        {this.renderArrows(classes.arrow)}
                    </div>
                    <div className={classes.column}>
                        {this.renderDutyDates('other',classes.addButton)}
                    </div>
                    <div className={classes.button}>
                        {this.renderErasers(classes.erasers,'other')}
                    </div>

                </div>
            </div>

        )
    }
}

const mapStateToProps = ({ loggedInUser }) => {
    return { loggedInUser };
};

let TradeDutyDatesPageRF = reduxForm({
    form: 'tradeDutyDates'
})(TradeDutyDatesPage)

TradeDutyDatesPageRF = withStyles(styles)(TradeDutyDatesPageRF);

export default connect(mapStateToProps,{
    getLoggedInUser
})(TradeDutyDatesPageRF);