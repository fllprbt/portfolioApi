const emailExists = (email: string) => {
    return (window as any).axios.post(`${window.location.href}emailExists`, {
        email,
    });
};

const registerUser = (
    email: string,
    password: string,
    confirmation: string
) => {
    return (window as any).axios.post(`${window.location.href}register`, {
        email,
        password,
        password_confirmation: confirmation,
    });
};

const loginUser = (email: string, password: string) => {
    return (window as any).axios.post(`${window.location.href}testLogin`, {
        email,
        password,
    });
};

const resetPassword = (email: string) => {
    return (window as any).axios.post(`${window.location.href}resetPassword`, {
        email,
    });
};

const onResendVerification = (email: string, password: string) => {
    return (window as any).axios.post(`${window.location.href}login/refresh`, {
        email,
        password,
    });
};

export {
    emailExists,
    registerUser,
    loginUser,
    resetPassword,
    onResendVerification,
};
