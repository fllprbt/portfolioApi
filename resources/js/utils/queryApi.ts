import { IAuthData } from './../interfaces';

const { env } = process;
const APP_URL =
    env.NODE_ENV === 'development' ? env.MIX_APP_DOCKER_URL : 'missingProdUrl';

const emailExists = (email: string) => {
    return (window as any).axios.post(`${APP_URL}/email`, {
        email,
    });
};

const registerUser = ({ passwordConfirmation, ...other }: IAuthData) => {
    return (window as any).axios.post(`${APP_URL}/register`, {
        ...other,
        password_confirmation: passwordConfirmation,
    });
};

const loginUser = (loginData: IAuthData) => {
    return (window as any).axios.post(`${APP_URL}/test/login`, {
        ...loginData,
    });
};

const resetPasswordEmail = (email: string) => {
    return (window as any).axios.post(`${APP_URL}/password/email`, {
        email,
    });
};

const resetPassword = (
    password: string,
    passwordConfirmation: string,
    token: string
) => {
    return (window as any).axios.post(`${APP_URL}/password/reset`, {
        password,
        password_confirmation: passwordConfirmation,
        token,
    });
};

const onResendVerification = (loginData: IAuthData) => {
    return (window as any).axios.post(`${APP_URL}/login/refresh`, {
        ...loginData,
    });
};

export {
    emailExists,
    registerUser,
    loginUser,
    resetPasswordEmail,
    resetPassword,
    onResendVerification,
};
