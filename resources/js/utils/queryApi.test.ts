import axios from 'axios';

import {
    registerUser,
    loginUser,
    resendVerification,
    sendPasswordResetEmail,
    resetPassword,
} from './queryApi';

import {
    registerData,
    loginData,
    passwordResetData,
} from './__mocks__/payload';

const {
    env: {
        APP_URL,
        ROUTE_REGISTER,
        ROUTE_LOGIN,
        ROUTE_RESEND_VERIFICATION,
        ROUTE_SEND_PASSWORD_RESET_EMAIL,
        ROUTE_RESET_PASSWORD,
    },
} = process;

const baseUrl = `${APP_URL}/`;

describe('Axios queries', () => {
    it('Ensures that endpoint urls are properly generated', () => {
        expect(APP_URL).toBe('http://0.0.0.0:8080');
        expect(ROUTE_REGISTER).toBe('register');
        expect(ROUTE_LOGIN).toBe('test/login');
        expect(ROUTE_RESEND_VERIFICATION).toBe('resend');
        expect(ROUTE_SEND_PASSWORD_RESET_EMAIL).toBe('password/email');
        expect(ROUTE_RESET_PASSWORD).toBe('password/reset');
    });

    it('Ensures that the payloads are ok', () => {
        registerUser(registerData);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith(`${baseUrl}${ROUTE_REGISTER}`, {
            email: registerData.email,
            password: registerData.password,
            password_confirmation: registerData.passwordConfirmation,
        });

        loginUser(loginData);
        expect(axios.post).toHaveBeenCalledTimes(2);
        expect(axios.post).toHaveBeenCalledWith(`${baseUrl}${ROUTE_LOGIN}`, {
            email: registerData.email,
            password: registerData.password,
        });

        resendVerification(loginData);
        expect(axios.post).toHaveBeenCalledTimes(3);
        expect(axios.post).toHaveBeenCalledWith(
            `${baseUrl}${ROUTE_RESEND_VERIFICATION}`,
            {
                email: registerData.email,
                password: registerData.password,
            }
        );

        sendPasswordResetEmail(loginData.email);
        expect(axios.post).toHaveBeenCalledTimes(4);
        expect(axios.post).toHaveBeenCalledWith(
            `${baseUrl}${ROUTE_SEND_PASSWORD_RESET_EMAIL}`,
            { email: loginData.email }
        );

        resetPassword(passwordResetData);
        expect(axios.post).toHaveBeenCalledTimes(5);
        expect(axios.post).toHaveBeenCalledWith(
            `${baseUrl}${ROUTE_RESET_PASSWORD}`,
            {
                email: passwordResetData.email,
                password: passwordResetData.password,
                password_confirmation: passwordResetData.passwordConfirmation,
                token: passwordResetData.token,
            }
        );
    });
});
