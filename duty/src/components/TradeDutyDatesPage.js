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

import validate from '../validators/TradeDutyDatesPageValidator';

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
        let arrows = this.state.arrows.slice();

        dutyDates.splice(index, 1, event.target.value);

        if (type === 'user') {
            if (event.target.value === "") {
                if (this.state.otherDutyDates[index] === "") {
                    arrows[index] = 'both';
                } else if (!this.state.otherDutyDates[index]) {
                    arrows[index] = 'right';
                } else {
                    arrows[index] = 'left';
                }
            } else {
                if (this.state.otherDutyDates[index] === "" || !this.state.otherDutyDates[index]) {
                    arrows[index] = 'right';
                } else {
                    arrows[index] = 'both';
                }
            }
        } else {
            if (event.target.value === "") {
                if (this.state.userDutyDates[index] === "") {
                    arrows[index] = 'both';
                } else if (!this.state.userDutyDates[index]) {
                    arrows[index] = 'left';
                } else {
                    arrows[index] = 'right';
                }
            } else {
                if (this.state.userDutyDates[index] === "" || !this.state.userDutyDates[index]) {
                    arrows[index] = 'left';
                } else {
                    arrows[index] = 'both';
                }
            }
        }

        if (type === 'user') {
            this.setState({ userDutyDates: dutyDates, arrows });
        } else {
            this.setState({ otherDutyDates: dutyDates, arrows });
        }
    }

    onAddClick = type => {
        let dutyDates = (type === 'user') ? this.state.userDutyDates.slice() : this.state.otherDutyDates.slice();
        let arrows = this.state.arrows.slice();
        const userDutyDatesLen = this.state.userDutyDates.length;
        const otherDutyDatesLen = this.state.otherDutyDates.length;

        if (type === 'user') {
            if (userDutyDatesLen >= otherDutyDatesLen) {
                arrows[userDutyDatesLen] = 'right';
            } if (this.state.otherDutyDates[userDutyDatesLen] === "") {
                arrows[userDutyDatesLen] = 'both';
            }
        } else {
            if (userDutyDatesLen <= otherDutyDatesLen) {
                arrows[otherDutyDatesLen] = 'left';
            } if (this.state.userDutyDates[otherDutyDatesLen] === "") {
                arrows[otherDutyDatesLen] = 'both';
            }
        }

        dutyDates.push("");

        (type === 'user') ? this.setState({ userDutyDates: dutyDates, arrows }) : this.setState({ otherDutyDates: dutyDates, arrows });
    }



    renderTextField = ({ input, key, label, index, meta: { touched, invalid, error }, ...custom }) => {
        let value = (input.name.slice(0,4) === 'user') ? this.state.userDutyDates[index] : this.state.otherDutyDates[index];

        return (
            <TextField
                {...input}
                label={label}
                variant="outlined"
                color="primary"
                placeholder={label}
                InputLabelProps={{
                    shrink: true
                }}
                error={touched && invalid}
                helperText={touched && error}
                value={value}
                type="date"
                {...custom}
            />)
    }

    renderDeletes = deleteCSS => {
        let deletes = [];

        for (let i=0; i < this.state.arrows.length; i++) {
            deletes.push(<Button onClick={() => this.onDeleteRowClick(i)} className={deleteCSS}><DeleteIcon /></Button>)
        }

        return deletes;
    }

    onDeleteRowClick = index => {
        let userDutyDates = this.state.userDutyDates.slice();
        let otherDutyDates = this.state.otherDutyDates.slice();
        let arrows = this.state.arrows.slice();

        userDutyDates.splice(index, 1);
        otherDutyDates.splice(index, 1);
        arrows.splice(index, 1);

        this.setState({ userDutyDates, otherDutyDates, arrows });
    }

    renderErasers = (eraserCSS,type) => {
        let erasers = [];
        let erasersLength = (type === 'user') ? this.state.userDutyDates.length : this.state.otherDutyDates.length;

        for (let i=0; i < erasersLength; i++) {
            erasers.push(<Button onClick={() => this.onEraserClick(i,type)} className={eraserCSS}><RemoveCircle /></Button>)
        }

        return erasers;
    }

    onEraserClick = (index,type) => {
        let dutyDates = (type === 'user') ? this.state.userDutyDates.slice() : this.state.otherDutyDates.slice();
        let arrows = this.state.arrows.slice();

        dutyDates[index] = "";

        if (type === 'user') {
            if (this.state.otherDutyDates.length > index) {
                if (this.state.otherDutyDates[index] !== '') {
                    arrows[index] = 'left';
                } else {
                    arrows[index] = 'both';
                }
            }
        } else {
            if (this.state.userDutyDates.length > index) {
                if (this.state.userDutyDates[index] !== '') {
                    arrows[index] = 'right';
                } else {
                    arrows[index] = 'both';
                }

            }
        }

        (type === 'user') ? this.setState({ userDutyDates: dutyDates, arrows }) : this.setState({ otherDutyDates: dutyDates, arrows })
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

    onSubmit = formValues => {
        console.log(formValues);
        return;
    }

    render() {
        const { classes, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)} autoComplete="off">
                <div className={classes.root}>
                    <div className={classes.leftColumn}>
                        <div className="calendar">
                            <Calendar
                                userDutyDates={this.state.userDutyDates}
                                otherDutyDates={this.state.otherDutyDates}
                                arrows={this.state.arrows}
                                page="TradeDutyDatesPage"
                            />
                        </div>
                        <div className="message">
                            <Field
                                name="message"
                                className={classes.message}
                                variant="filled"
                                multiline={true}
                                label="Message"
                                component={TextField}
                            />
                        </div>
                    </div>
                    <div className={classes.rightColumn}>
                        <div className={classes.top}>
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
                        <div className={classes.bottom}>
                            <Button color="secondary">Back</Button>
                            <Button type="submit" color="primary">Request</Button>
                        </div>
                    </div>
                </div>
            </form>


        )
    }
}

const mapStateToProps = ({ loggedInUser }) => {
    return { loggedInUser };
};

let TradeDutyDatesPageRF = reduxForm({
    form: 'tradeDutyDates',
    validate
})(TradeDutyDatesPage);

TradeDutyDatesPageRF = withStyles(styles)(TradeDutyDatesPageRF);

export default connect(mapStateToProps,{
    getLoggedInUser
})(TradeDutyDatesPageRF);