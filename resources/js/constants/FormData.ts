import { FormTypes } from './FormTypes';

const { login, register, verify, verified, resetPassword } = FormTypes;

export const FormData = {
    [register]: {
        title: 'Register to API',
        linksToType: login,
    },
    [login]: {
        title: 'Test login',
        linksToType: register,
    },
    [verify]: {
        linksToType: login,
    },
    [verified]: {
        linksToType: login,
    },
    [resetPassword]: {
        title: 'Password Reset',
        linksToType: login,
    },
};
