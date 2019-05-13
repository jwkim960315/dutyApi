import isValidDate from './dateValidator';

// First Name, Last Name, Company Validator
export default formValues => {
    const errors = {};

    console.log(formValues);

    if (!formValues.firstName) {
        errors.firstName = 'You must enter your first name';
    } else if (formValues.firstName.length > 2) {
        errors.firstName = 'Please write your first name within two Korean Characters';
    }

    if (!formValues.lastName) {
        errors.lastName = 'You must enter your last name';
    } else if (formValues.lastName.length > 2) {
        errors.lastName = 'Please write your last name within two Korean Characters';
    }

    if (!formValues.company) {
        errors.company = 'You must select your company';
    }

    if (!formValues.ets) {
        errors.ets = 'You must provide your ETS date';
    } else if (!isValidDate(formValues.ets)) {
        errors.ets = 'Invalid Date: require format of "YYYY-MM-DD"';
    }
    if (formValues.dutyDatesDic) {
        Object.keys(formValues.dutyDatesDic).forEach(key => {
            if (!isValidDate(formValues[key])) {
                errors[key] = 'Invalid Date: require format of "YYYY-MM-DD"';
            }
        });
    }


    for (let i=0; i < formValues.addedDutyDatesNum; i++) {
        if (formValues[`newDutyDate${i}`]) {
            if (!isValidDate(formValues[`newDutyDate${i}`])) {
                errors[`newDutyDate${i}`] = 'Invalid Date: require format of "YYYY-MM-DD"';
            }
        }
    }

    return errors;
};