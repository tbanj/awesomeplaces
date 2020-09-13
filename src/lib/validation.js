/* eslint-disable prettier/prettier */
/* eslint-disable no-bitwise */
const validate = (val, rules) => {
    let isValid = true;
    for (let rule in rules) {
        switch (rule) {
            case 'isMail':
                isValid = isValid & emailValidator(val);
                break;

            default:
                break;
        }
    }
}


const emailValidator = () => { };

export default validate;