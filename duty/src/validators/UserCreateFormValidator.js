// First Name, Last Name, Company Validator
export default formValues => {
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