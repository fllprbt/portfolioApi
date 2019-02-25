export interface IRegistrationFormData {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface ILoginFormData {
    email: string;
    password: string;
}

export interface IPasswordResetFormData {
    email: string;
    password: string;
    passwordConfirmation: string;
    token: string;
}
