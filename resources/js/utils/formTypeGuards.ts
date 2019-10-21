import {
    ILoginFormData,
    IPasswordResetFormData,
    IRegistrationFormData,
} from 'api/interfaces';

export type TFormPayload =
    | IRegistrationFormData
    | ILoginFormData
    | IPasswordResetFormData;

/**
 * Checks if the passed attribute is of IRegistrationFormData type
 * @param {Object} data - the object to test
 * @returns {boolean} the result of typeguarding
 */
export function isRegistrationData(
    data: TFormPayload
): data is IRegistrationFormData {
    return (
        'email' in data && 'password' in data && 'passwordConfirmation' in data
    );
}

/**
 * Checks if the passed attribute is of ILoginFormData type
 * @param {Object} data - the object to test
 * @returns {boolean} the result of typeguarding
 */
export function isLoginData(data: TFormPayload): data is ILoginFormData {
    return 'email' in data && 'password' in data;
}

/**
 * Checks if the passed attribute is of IPasswordResetFormData type
 * @param {Object} data - the object to test
 * @returns {boolean} the result of typeguarding
 */
export function isPasswordResetData(
    data: TFormPayload
): data is IPasswordResetFormData {
    return (
        'email' in data &&
        'password' in data &&
        'passwordConfirmation' in data &&
        'token' in data
    );
}
