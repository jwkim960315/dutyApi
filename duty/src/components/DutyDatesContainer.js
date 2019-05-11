import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import styles from '../css/DutyDatesContainerCSS';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { Field } from 'redux-form';
import {
    getLoggedInUser,
    toggleCalendarModal,
    incrementDutyDatesNum,
    decrementDutyDatesNum,
    deleteDutyDate,
    addNewDutyDates
} from '../actions';

import TextField from "@material-ui/core/TextField";



class DutyDatesContainer extends React.Component {
    state = {
        addedDutyDatesLst: [],
        originalDutyDatesLst: []
    }

    onAddClick = () => {
        this.setState({ addedDutyDatesLst: [...this.state.addedDutyDatesLst, ''] });

        // To keep track of added duty dates text field number for validate
        this.props.incrementDutyDatesNum();
        this.props.addNewDutyDates(this.state.addedDutyDatesLst);
    }

    onInputChange = (event,index) => {
        let lst = this.state.addedDutyDatesLst.slice();
        lst[index] = event.target.value;
        this.setState({ addedDutyDatesLst: lst });
    }

    onNewFieldDeleteClick = index => {
        let lst = this.state.addedDutyDatesLst.slice();
        lst.splice(index,1);
        this.setState({ addedDutyDatesLst: lst });

        // To keep track of added duty dates text field number for validate
        this.props.decrementDutyDatesNum();
    }

    onDutyDateDelete = dutyDate => {
        this.props.deleteDutyDate(this.props.loggedInUser._id, dutyDate);
    }

    renderDutyDateTextField = ({ input, label, index, meta: { touched, invalid, error }, ...custom }) => {
        let value = (input.name.slice(0,8) === 'dutyDate') ? this.state.originalDutyDatesLst[index] : this.state.addedDutyDatesLst[index];
        return (
            <TextField
                {...input}
                variant="outlined"
                color="primary"
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                value={value}
                {...custom}
            />
        );
    }



    renderDutyDateButtons = () => {
        if (this.props.loggedInUser) {
            const { dutyDatesDic } = this.props;
            let dutyDatesLst = [];

            console.log(this.props.originalDutyDatesNum);
            if (dutyDatesDic) {
                // rendering existing duty dates
                for (let i=0; i < this.props.originalDutyDatesNum; i++) {

                    dutyDatesLst.push(
                        <div key={`duty-date-${i}`}>
                            <Field
                                name={`dutyDate${i}`}
                                label="Duty Date"
                                style={{ "margin": "5px 0 5px 0" }}
                                key={i}
                                component={this.props.renderTextField}
                                onChange={e => this.props.onInputChange(e,i)}
                            />
                            <Button
                                key={`duty-date-delete${i}`}
                                onClick={() => this.props.onDutyDateDelete(dutyDatesDic[`dutyDate${i}`],i)}
                            >
                                <DeleteIcon color="error"/>
                                Delete
                            </Button>
                        </div>
                    );
                }

                // dutyDatesLst = Object.keys(dutyDatesDic).map((key,i) => {
                //     return (
                //         <div key={`duty-date-${i}`}>
                //             <Field
                //                 name={key}
                //                 label="Duty Date"
                //                 style={{ "margin": "5px 0 5px 0" }}
                //                 key={i}
                //                 component={this.props.renderTextField}
                //                 onChange={e => this.props.onInputChange(e,i)}
                //             />
                //             <Button key={`duty-date-edit${i}`}>
                //                 <EditIcon color="primary"/>
                //                 Edit
                //             </Button>
                //             <Button
                //                 key={`duty-date-delete${i}`}
                //                 onClick={() => this.props.onDutyDateDelete(dutyDatesDic[`dutyDate${i}`],i)}
                //             >
                //                 <DeleteIcon color="error"/>
                //                 Delete
                //             </Button>
                //         </div>
                //     );
                // });
            }

            // rendering TextField for duty dates
            for (let i=0; i < this.state.addedDutyDatesLst.length;i++) {
                dutyDatesLst.push(
                    <div key={`new-field-${i}`}>
                        <Field
                            name={`newDutyDate${i}`}
                            index={i}
                            style={{ "margin": "10px 0 10px 0" }}
                            label="Duty Date"
                            onChange={e => this.onInputChange(e,i,"newDutyDate")}
                            component={this.renderDutyDateTextField} />
                        <Button key={`new-field-delete${i}`} onClick={() => this.onNewFieldDeleteClick(i)} style={{ "margin": "10px 0 10px 0" }}><DeleteIcon color="error" />Delete</Button>
                    </div>
                    );
            }

            // rendering add button
            dutyDatesLst.push(
                    <Button key={`add-${dutyDatesLst.length}`} style={{ "margin": "5px 0 5px 0" }} onClick={this.onAddClick}>
                        <AddIcon />
                    </Button>
            );

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

const mapStateToProps = ({ loggedInUser, addedDutyDatesNum, newDutyDates }) => {
    return { loggedInUser, addedDutyDatesNum, newDutyDates };
}

const DutyDatesContainerWithCSS = withStyles(styles)(DutyDatesContainer);

export default connect(mapStateToProps,{
    getLoggedInUser,
    toggleCalendarModal,
    incrementDutyDatesNum,
    decrementDutyDatesNum,
    deleteDutyDate,
    addNewDutyDates
})(DutyDatesContainerWithCSS);