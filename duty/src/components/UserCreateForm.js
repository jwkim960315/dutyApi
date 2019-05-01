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
import { required, date } from 'redux-form-validators';
import { withStyles } from '@material-ui/styles';
import styles from '../css/UserCreateFormCSS';
import { connect } from 'react-redux';

import { createUser } from '../actions';

class UserCreateForm extends React.Component {
    onSubmit = formValues => {

        formValues.dutyDates = formValues.dutyDates || null;
        formValues.dutyType = '인사과당직';
        this.props.createUser(formValues, () => {
            this.props.history.push("/home");
        });
    }

    renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => {
        return (
            <TextField
                variant="outlined"
                color="primary"
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                {...input}
                {...custom}
            />
        );
    }

    // Radio buttons error renderer
    renderError = (touched, invalid, error) => {
        if (touched && invalid) {
            return <FormHelperText>{error}</FormHelperText>
        };
    }

    radioButton = ({ input, meta, ...rest }) => (
        <FormControl error={meta.touched && meta.invalid}>
            <FormLabel component="legend">Company</FormLabel>
            <RadioGroup {...input} {...rest}>
                <FormControlLabel value="사단본중" control={<Radio color="primary"/>} label="사단본중" />
                <FormControlLabel value="HHBN" control={<Radio color="primary" />} label="HHBN" />
            </RadioGroup>
            {this.renderError(meta.touched, meta.invalid, meta.error)}
        </FormControl>
    )

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} autoComplete="off">
                    <div className={classes.fieldDiv}>
                        <Field name="first_name" label="First Name" component={this.renderTextField} />
                    </div>
                    <div className={classes.fieldDiv}>
                        <Field name="last_name" label="Last Name" component={this.renderTextField} />
                    </div>
                    <div className={classes.fieldDiv}>
                        <Field name="company" component={this.radioButton}>
                            <Radio value="사단본중" label="사단본중" />
                            <Radio value="HHBN" label="HHBN" />
                        </Field>
                    </div>
                    <div style={{ "display": "inline" }} className={classes.fieldDiv}>
                        <Field name="ets" label="ETS Date" component={this.renderTextField} validate={[required(), date({ format: 'yyyy/mm/dd' })]} />
                    </div>
                    <div className={classes.buttonDiv}>
                        <Button  variant="contained" className={classes.button}>Cancel</Button>
                        <Button variant="contained" color="primary" className={classes.button} type="submit">Submit</Button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

// First Name, Last Name, Company Validator
const validate = formValues => {
    const errors = {};

    if (!formValues.first_name) {
        errors.first_name = 'You must enter your first name';
    } else if (formValues.first_name.length > 2) {
        errors.first_name = 'Please write your first name within two Korean Characters';
    }

    if (!formValues.last_name) {
        errors.last_name = 'You must enter your last name';
    } else if (formValues.last_name.length > 2) {
        errors.last_name = 'Please write your last name within two Korean Characters';
    }

    if (!formValues.company) {
        errors.company = 'You must select your company';
    }

    return errors;
};

const UserCreateFormWithCSS = connect(null,{
    createUser
})(withStyles(styles)(UserCreateForm));

export default reduxForm({
    form: 'userCreate',
    validate
})(UserCreateFormWithCSS);