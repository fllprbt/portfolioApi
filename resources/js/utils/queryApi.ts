import { IAuthData } from './../interfaces';

const { env } = process;
const APP_URL =
    env.NODE_ENV === 'development' ? env.MIX_APP_DOCKER_URL : 'missingProdUrl';

const emailExists = (email: string) => {
    return (window as any).axios.post(`${APP_URL}/emailExists`, {
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
    return (window as any).axios.post(`${APP_URL}/testLogin`, {
        ...loginData,
    });
};

const resetPassword = (email: IAuthData) => {
    return (window as any).axios.post(`${APP_URL}/resetPassword`, {
        email,
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
    resetPassword,
    onResendVerification,
};
