/* eslint-disable prettier/prettier */
/* eslint-disable no-bitwise */
const validate = (val, rules, connectedValue) => {
    let isValid = true;

    for (let rule in rules) {
        switch (rule) {
            case 'isEmail':
                isValid = isValid && emailValidator(val);
                break;
            case 'minLength':
                let testOp = minLengthValidator(val, rules[rule]);
                isValid = isValid && testOp;
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            default:
                isValid = true;
        }
    }
    return isValid;
};


const emailValidator = (val) => {
    return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(val);
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkValue) => {
    return val === checkValue;
};


export default validate;
