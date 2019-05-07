import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from '../css/UserCreateFormCSS';
import { connect } from 'react-redux';
import DutyDatesContainer from './DutyDatesContainer';
import CalendarModal from './CalendarModal';
import moment from 'moment';

import { createUser, getLoggedInUser } from '../actions';

import validate from '../validators/UserCreateFormValidator';

class UserCreateForm extends React.Component {
    state = {
        modalOpen: false,
        selectedDate: null
    }

    componentDidMount() {
        this.props.getLoggedInUser();

    }

    toggleModal = (selectedDate=null) => {
        this.setState(
            {
                modalOpen: (this.state.modalOpen) ? false : true,
                selectedDate
        });

    }


    onSubmit = formValues => {
        formValues.dutyDates = formValues.dutyDates || null;
        formValues.dutyType = '인사과당직';
        this.props.createUser(formValues, () => {
            this.props.history.push("/home");
        });
    }

    renderTextField = ({ stateProp, input, label, meta: { touched, invalid, error } }) => {
        return (
            <TextField
                {...input}
                variant="outlined"
                color="primary"
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
            />
        );
    }

    // Radio buttons error renderer
    renderError = (touched, invalid, error) => {
        if (touched && invalid) {
            return <FormHelperText>{error}</FormHelperText>
        };
    }

    radioButton = ({ input, meta: { touched, invalid, error }, ...rest }) => (
        <FormControl error={touched && invalid}>
            <FormLabel component="legend">Company</FormLabel>
            <RadioGroup {...input} {...rest}>
                <FormControlLabel value="사단본중" control={<Radio color="primary"/>} label="사단본중" />
                <FormControlLabel value="HHBN" control={<Radio color="primary" />} label="HHBN" />
            </RadioGroup>
            {this.renderError(touched, invalid, error)}
        </FormControl>
    )

    render() {
        const { classes } = this.props;
        return (
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
                    <div className={classes.root}>
                        <div className={classes.userProfileLeft}>
                            <div className={classes.fieldDiv}>
                                <Field name="firstName" stateProp="firstName" label="First Name" component={this.renderTextField}/>
                            </div>
                            <div className={classes.fieldDiv}>
                                <Field name="lastName" stateProp="lastName" label="Last Name" component={this.renderTextField} />
                            </div>
                            <div className={classes.fieldDiv}>
                                <Field name="company" component={this.radioButton}>
                                    <Radio value="사단본중" label="사단본중" />
                                    <Radio value="HHBN" label="HHBN" />
                                </Field>
                            </div>
                            <div className={classes.fieldDiv}>
                                <Field name="ets" stateProp="ets" label="ETS Date" component={this.renderTextField} />
                            </div>

                        </div>
                        <div className={classes.userProfileRight}>
                            <div className={classes.dutyDates}>
                                <DutyDatesContainer toggleModal={this.toggleModal} loggedInUser={this.props.loggedInUser}/>
                            </div>
                            <div className={classes.buttonDivRight}>
                                <Button  variant="contained" className={classes.button}>Cancel</Button>
                                <Button variant="contained" color="primary" className={classes.button} type="submit">Submit</Button>
                            </div>
                        </div>
                        <CalendarModal loggedInUser={this.props.loggedInUser} selectedDate={this.state.selectedDate} modalOpen={this.state.modalOpen} toggleModal={this.toggleModal} />
                    </div>
                </form>

        );
    }
}

const mapStateToProps = ({ loggedInUser }) => {
    if (loggedInUser) {
        const ets = (loggedInUser.ets) ? moment(loggedInUser.ets).format('YYYY-MM-DD') : loggedInUser.ets;
        return {
            initialValues: {
                firstName: loggedInUser.name.firstName,
                lastName: loggedInUser.name.lastName,
                ets,
                company: loggedInUser.company,
                dutyDates: loggedInUser.dutyDates
            }
        };

    }
    return {};
};

const UserCreateFormWithReduxForm = reduxForm({
    form: 'userCreate',
    validate,
    enableReinitialize: true
})(UserCreateForm);

export default connect(mapStateToProps,{
    createUser,
    getLoggedInUser
})(withStyles(styles)(UserCreateFormWithReduxForm));

