import {
    isRegistrationData,
    isLoginData,
    isPasswordResetData,
} from './formTypeGuards';

import { loginData } from './__mocks__/payload';

interface IFormPayloadMock {
    email: string;
    password: string;
    passwordConfirmation?: string;
    token?: string;
}

const data: IFormPayloadMock = loginData;

describe('Form type guards', () => {
    it('Fails if the required fields are missing', () => {
        expect(isLoginData(data)).toBeTruthy();
        expect(isRegistrationData(data)).toBeFalsy();
        data.passwordConfirmation = 'password';
        expect(isRegistrationData(data)).toBeTruthy();
    });

    it('Fails if the fields exist but are empty', () => {
        data.token = '';
        expect(isPasswordResetData(data)).toBeFalsy();
        data.token = 'abcdefg';
        expect(isPasswordResetData(data)).toBeTruthy();
    });
});
