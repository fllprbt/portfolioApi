import {
    ILoginFormData,
    IPasswordResetFormData,
    IRegistrationFormData
} from 'api/interfaces';

const {
    env: { NODE_ENV, APP_URL }
} = process;
const URL = NODE_ENV === 'development' ? APP_URL : 'missingProdUrl';

/**
 * Sends a request to register a new user in the API
 * @param {Object} - the object with the registration data
 * @returns {Promise} the request promise
 */
const registerUser = ({
    passwordConfirmation,
    ...other
}: IRegistrationFormData): Promise<void> =>
    (window as any).axios.post(`${URL}/register`, {
        ...other,
        password_confirmation: passwordConfirmation
    });

/**
 * Sends a request to test the login credentials of a user in the API
 * @param {Object} - the object with the login data
 * @returns {Promise} the request promise
 */
const loginUser = (loginData: ILoginFormData): Promise<void> =>
    (window as any).axios.post(`${URL}/test/login`, {
        ...loginData
    });

/**
 * Sends a request for a new verification email
 * @param {Object} - the object with the login data
 * @returns {Promise} the request promise
 */
const resendVerification = (loginData: ILoginFormData): Promise<void> =>
    (window as any).axios.post(`${URL}/resend`, {
        ...loginData
    });

/**
 * Sends a request for a password reset email
 * @param {string} email - the email of the user whose password should be reset
 * @returns {Promise} the request promise
 */
const sendPasswordResetEmail = (email: string): Promise<void> => {
    return (window as any).axios.post(`${URL}/password/email`, { email });
};

/**
 * Sends a request with the new password credentials of a user
 * @param {string} email - the email of the user whose password should be reset
 * @returns {Promise} the request promise
 */
const resetPassword = ({
    passwordConfirmation,
    ...other
}: IPasswordResetFormData) =>
    (window as any).axios.post(`${URL}/password/reset`, {
        ...other,
        password_confirmation: passwordConfirmation
    });

export {
    registerUser,
    loginUser,
    sendPasswordResetEmail,
    resetPassword,
    resendVerification
};
