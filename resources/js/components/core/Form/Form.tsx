import * as React from 'react';

import {
    Avatar,
    Paper,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core/';

import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import LockedIcon from '@material-ui/icons/LockOutlined';

import { LinkButton, SimpleSnackbar, SubmitButton } from 'api/components/core';

import {
    FormData as FormInformation,
    FormMessages,
    FormTypes,
} from 'api/constants';

import { IApiResponsePayload } from 'api/interfaces';

import { TFormPayload } from 'api/utils/formTypeGuards';

import {
    isLoginData,
    isPasswordResetData,
    isRegistrationData,
    loginUser,
    objValuesToString,
    registerUser,
    resendVerification,
    resetPassword,
    sendPasswordResetEmail,
} from 'api/utils';

import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
    title?: string;
    children?: React.ReactNode;
    type: string;
    formData: TFormPayload;
    disabled?: boolean;

    onMenuChange: () => void;
    onSubmit: (handleSubmit: () => void) => void;
}

interface IState {
    response: string;
    pendingRequest: boolean;
    snackbar: boolean;
    status: string;

    snackbarAction: (() => void) | null;
}

class Form extends React.Component<IProps, IState> {
    static defaultProps = {
        title: '',
        children: null,
        type: FormTypes.register,
        formData: {
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        disabled: false,

        onMenuChange: () => null,
        onSubmit: () => null,
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            status: '200',
            snackbar: false,
            snackbarAction: null,
            response: '',
            pendingRequest: false,
        };
    }

    /**
     * Disallows the snackbar from closing when clicking somewhere else
     */
    handleSnackbarClose = (_, reason: string): void => {
        if (reason !== 'clickaway') this.setState({ snackbar: false });
    };

    /**
     * Returns an informative string based on the response object's shape
     */
    responseToString = (errors: IApiResponsePayload): string => {
        const { title, description } = errors;
        if (!description) return title;

        return typeof description === 'string'
            ? description
            : objValuesToString(description);
    };

    /**
     * Handle's the form's submissions based on the form's type
     */
    handleSubmit = (): void => {
        const { type, formData } = this.props;
        this.setState({ pendingRequest: true });
        const { register, login, resetPassword: resetPwd } = FormTypes;

        if (type === register && isRegistrationData(formData)) {
            registerUser(formData)
                .then(() => this.storeLastResponse(FormMessages.userCreated))
                .catch((errors) => this.handleSubmitErrors(errors));
        } else if (type === login && isLoginData(formData)) {
            loginUser(formData)
                .then(() => this.storeLastResponse(FormMessages.loginSuccess))
                .catch((errors) => this.handleSubmitErrors(errors));
        } else if (type === resetPwd && isPasswordResetData(formData)) {
            resetPassword(formData)
                .then(() => this.storeLastResponse(FormMessages.passwordReset))
                .catch((errors) => this.handleSubmitErrors(errors));
        } else this.setState({ pendingRequest: false });
    };

    /**
     * Handle's the form's behavior on erroneous responses
     */
    handleSubmitErrors = (payload): void => {
        const {
            errors,
        }: { errors: IApiResponsePayload } = payload.response.data;
        const response = this.responseToString(errors);
        this.storeLastResponse(response, errors.status);
    };

    /**
     * Returns a callback action for the snackbar's button or null
     */
    handleSnackbarClick = (): (() => Promise<void>) | null => {
        const { type, formData } = this.props;
        const { status } = this.state;
        const { login, resetPassword: resetPwd } = FormTypes;

        if (type === login && isLoginData(formData)) {
            if (status === '403') {
                return () =>
                    resendVerification(formData)
                        .then(() =>
                            this.storeLastResponse(FormMessages.resendEmail)
                        )
                        .catch((errors) => this.handleSubmitErrors(errors));
            } else if (status === '401') {
                return () =>
                    sendPasswordResetEmail(formData.email)
                        .then(() => {
                            this.storeLastResponse(FormMessages.resendEmail);
                        })
                        .catch((errors) => this.handleSubmitErrors(errors));
            }
        } else if (
            type === resetPwd &&
            isPasswordResetData(formData) &&
            status === '500'
        ) {
            return () =>
                sendPasswordResetEmail(formData.email)
                    .then(() => {
                        this.storeLastResponse(FormMessages.resendEmail);
                    })
                    .catch((errors) => this.handleSubmitErrors(errors));
        }

        return null;
    };

    /**
     * Updates the component's state regarding the latest API response
     */
    storeLastResponse = (response: string, status = '200'): void =>
        this.setState({
            response,
            pendingRequest: false,
            snackbar: true,
            status,
        });

    render() {
        const {
            title,
            children,
            classes,
            disabled,
            onSubmit,
            type,
        } = this.props;
        const { pendingRequest, snackbar, response, status } = this.state;
        const { main, paper, avatar, buttonWrapper } = classes;
        const { linksToType } = FormInformation[type];

        return (
            <main className={main}>
                <Paper className={paper}>
                    <Avatar className={avatar}>
                        {type === FormTypes.register ? (
                            <AccountIcon />
                        ) : (
                            <LockedIcon />
                        )}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    <br />
                    {children}
                    <div className={buttonWrapper}>
                        <LinkButton
                            link={`/${linksToType}`}
                            label={FormInformation[linksToType].title}
                        />
                        <SubmitButton
                            onClick={() => onSubmit(this.handleSubmit)}
                            disabled={disabled || pendingRequest}
                        >
                            Submit
                        </SubmitButton>
                    </div>
                </Paper>
                <SimpleSnackbar
                    open={snackbar}
                    notification={response}
                    onSnackbarClose={this.handleSnackbarClose}
                    clickLabel={
                        status === '403' || status === '500'
                            ? 'Resend email'
                            : 'Reset password'
                    }
                    onSnackbarClick={this.handleSnackbarClick()}
                />
            </main>
        );
    }
}

export default withStyles(styles)(Form);
