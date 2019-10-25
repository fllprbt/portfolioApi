import {
    ILoginFormData,
    IPasswordResetFormData,
    IRegistrationFormData,
} from 'api/interfaces';

const {
    env: {
        NODE_ENV,
        APP_URL,
        ROUTE_REGISTER,
        ROUTE_LOGIN,
        ROUTE_RESEND_VERIFICATION,
        ROUTE_SEND_PASSWORD_RESET_EMAIL,
        ROUTE_RESET_PASSWORD,
    },
} = process;

export const baseUrl =
    NODE_ENV === 'development' ? `${APP_URL}/` : 'productionUrl';

/**
 * Sends a request to register a new user in the API
 * @param {Object} - the object with the registration data
 * @returns {Promise} the request promise
 */
const registerUser = ({
    passwordConfirmation,
    ...other
}: IRegistrationFormData) =>
    window.axios.post(`${baseUrl}${ROUTE_REGISTER}`, {
        ...other,
        password_confirmation: passwordConfirmation,
    });

/**
 * Sends a request to test the login credentials of a user in the API
 * @param {Object} - the object with the login data
 * @returns {Promise} the request promise
 */
const loginUser = (loginData: ILoginFormData) =>
    window.axios.post(`${baseUrl}${ROUTE_LOGIN}`, {
        ...loginData,
    });

/**
 * Sends a request for a new verification email
 * @param {Object} - the object with the login data
 * @returns {Promise} the request promise
 */
const resendVerification = (loginData: ILoginFormData) =>
    window.axios.post(`${baseUrl}${ROUTE_RESEND_VERIFICATION}`, {
        ...loginData,
    });

/**
 * Sends a request for a password reset email
 * @param {string} email - the email of the user whose password should be reset
 * @returns {Promise} the request promise
 */
const sendPasswordResetEmail = (email: string) =>
    window.axios.post(`${baseUrl}${ROUTE_SEND_PASSWORD_RESET_EMAIL}`, {
        email,
    });

/**
 * Sends a request with the new password credentials of a user
 * @param {string} email - the email of the user whose password should be reset
 * @returns {Promise} the request promise
 */
const resetPassword = ({
    passwordConfirmation,
    ...other
}: IPasswordResetFormData) =>
    window.axios.post(`${baseUrl}${ROUTE_RESET_PASSWORD}`, {
        ...other,
        password_confirmation: passwordConfirmation,
    });

export {
    registerUser,
    loginUser,
    sendPasswordResetEmail,
    resetPassword,
    resendVerification,
};
