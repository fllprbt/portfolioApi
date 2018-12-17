import { formMessages } from '../constants';
import { IAuthData } from '../interfaces';

const canRegister = (formData: IAuthData, errors: IAuthData) => {
    const dataKeys = Object.keys(formData);

    return (
        dataKeys.filter((key) => Boolean(formData[key])).length ===
            dataKeys.length &&
        !Object.keys(errors).filter((key) => Boolean(errors[key])).length
    );
};

const canLogin = (formData: IAuthData, errors: IAuthData) =>
    formData.email &&
    formData.password &&
    !errors.password &&
    (!errors.email || errors.email !== formMessages.malformedEmail);

const canReset = (email: string, emailError: string) =>
    email && (!emailError || emailError !== formMessages.malformedEmail);

export { canRegister, canLogin, canReset };
