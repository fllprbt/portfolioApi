import formTypes from './FormTypes';

const formNavigation = {
    [formTypes.register]: {
        description: 'Register to API',
        action: 'Register',
        navigationLabel: 'Account owner?',
        linksToType: formTypes.login,
    },
    [formTypes.login]: {
        description: 'Test Login',
        action: 'Login',
        navigationLabel: 'Need account?',
        linksToType: formTypes.register,
    },
    [formTypes.resetPassword]: {
        description: 'Reset password',
        action: 'Reset',
        navigationLabel: 'Account reset?',
        linksToType: formTypes.login,
    },
};

export default formNavigation;
