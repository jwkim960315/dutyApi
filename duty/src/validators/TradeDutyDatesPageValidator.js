export default formValues => {
    const errors = {};

    let keysWOMessage = Object.keys(formValues).filter(key => key.includes('DutyDate'));
    let valuesWOMessage = keysWOMessage.map(key => formValues[key]);

    keysWOMessage.forEach((key,index) => {
        console.log(key);
        console.log(valuesWOMessage);
        if (valuesWOMessage.includes(formValues[key]) && index !== valuesWOMessage.indexOf(formValues[key])) {
            errors[key] = 'redundant dates';
        }
    });

    return errors;
}