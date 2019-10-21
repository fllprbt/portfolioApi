import { FormTypes } from './FormTypes';

const { login, register, alreadyVerified, verified, resetPassword } = FormTypes;

export const FormData = {
    [register]: {
        title: 'Register to API',
        linksToType: login,
    },
    [login]: {
        title: 'Test login',
        linksToType: register,
    },
    [verified]: {
        linksToType: login,
    },
    [alreadyVerified]: {
        linksToType: login,
    },
    [resetPassword]: {
        title: 'Password Reset',
        linksToType: login,
    },
};
