import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import styles from '../css/DutyDatesContainerCSS';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { Field } from 'redux-form';
import { getLoggedInUser, toggleCalendarModal } from '../actions';

import { incrementDutyDatesNum } from '../actions';
import TextField from "@material-ui/core/TextField";



class DutyDatesContainer extends React.Component {
    state = {
        addedDutyDatesLst: []
    }

    constructor(props) {
        super(props);
    }

    onAddClick = () => {
        this.setState({ addedDutyDatesLst: [...this.state.addedDutyDatesLst, ''] });

        // To keep track of added duty dates text field number for validate
        this.props.incrementDutyDatesNum();
    }

    onInputChange = (event,index) => {
        let lst = this.state.addedDutyDatesLst.slice();
        lst[index] = event.target.value;
        this.setState({ addedDutyDatesLst: lst });
    }

    renderDutyDateTextField = ({ input, label, index, meta: { touched, invalid, error }, ...custom }) => {
        return (
            <TextField
                {...input}
                variant="outlined"
                color="primary"
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                value={this.state.addedDutyDatesLst[index]}
                {...custom}
            />
        );
    }


    renderDutyDateButtons = () => {
        if (this.props.loggedInUser) {
            const { dutyDates } = this.props.loggedInUser;
            let dutyDatesLst = [];
            if (dutyDates !== null) {
                // rendering existing duty dates
                dutyDatesLst = dutyDates.map((dutyDate,i) => {
                    return (
                        <div>
                            <Button style={{ "margin": "5px 0 5px 0" }} key={i}>{moment(dutyDate).format('YYYY-MM-DD')}</Button>
                            <Button><EditIcon color="primary"/>Edit</Button>
                            <Button><DeleteIcon color="error" />Delete</Button>
                        </div>
                    );
                });
            }

            // rendering TextField for duty dates
            for (let i=0; i < this.state.addedDutyDatesLst.length;i++) {
                dutyDatesLst.push(
                    <div>
                        <Field
                            name={`dutyDate${i}`}
                            index={i}
                            style={{ "margin": "10px 0 10px 0" }}
                            label="Duty Date"
                            key={`duty-dates-${i+dutyDatesLst.length}`}
                            onChange={e => this.onInputChange(e,i)}
                            component={this.renderDutyDateTextField} />
                        <Button style={{ "margin": "10px 0 10px 0" }}><DeleteIcon color="error" />Delete</Button>
                    </div>
                    );
            }

            // rendering add button
            dutyDatesLst.push(<Button style={{ "margin": "5px 0 5px 0" }} key={dutyDatesLst.length} onClick={this.onAddClick}><AddIcon /></Button>);

            return dutyDatesLst;
        } else {
            // data has not been loaded;
            return null;
        }
    }

    render() {

        return (
            <div style={{ "display": "flex", "flexDirection": "column"}}>
                {this.renderDutyDateButtons()}
            </div>
        )
    }
}

const mapStateToProps = ({ loggedInUser, addedDutyDatesNum }) => {
    return { loggedInUser, addedDutyDatesNum };
}

const DutyDatesContainerWithCSS = withStyles(styles)(DutyDatesContainer);

export default connect(mapStateToProps,{
    getLoggedInUser,
    toggleCalendarModal,
    incrementDutyDatesNum
})(DutyDatesContainerWithCSS);