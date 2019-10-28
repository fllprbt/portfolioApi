import {
    ILoginFormData,
    IRegistrationFormData,
    IPasswordResetFormData,
} from 'api/interfaces';

export const loginData: ILoginFormData = {
    email: 'test@test.com',
    password: 'pass',
};

export const registerData: IRegistrationFormData = {
    ...loginData,
    passwordConfirmation: 'pass',
};

export const passwordResetData: IPasswordResetFormData = {
    ...registerData,
    token: '12345',
};
