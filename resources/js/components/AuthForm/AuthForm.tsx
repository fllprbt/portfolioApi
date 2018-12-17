import * as React from 'react';

import {
    Avatar,
    Button,
    CircularProgress,
    CssBaseline,
    FormControl,
    Input,
    InputLabel,
    Paper,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core/';
import LockIcon from '@material-ui/icons/LockOutlined';

import styles from '../../styles';
import { SimpleSnackBar } from '../SimpleSnackBar';

import { formMessages, formNavigation, formTypes } from '../../constants';
import { IApiResponse, IAuthData } from '../../interfaces';
import {
    AuthRegEx,
    canLogin,
    canRegister,
    canReset,
    emailExists,
    loginUser,
    onResendVerification,
    registerUser,
    resetPasswordEmail,
} from '../../utils';

export interface IProps extends WithStyles<typeof styles> { }
export interface IState {
    formType: string;
    formData: IAuthData;
    errors: IAuthData;

    disabledRegistration?: boolean;
    apiLoading?: boolean;
    snackBar?: boolean;
    lastApiResponse: IApiResponse;
}

class AuthForm extends React.Component<IProps, IState> {
    passwordConfirmationRef: React.RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);
        this.state = {
            formType: formTypes.register,
            disabledRegistration: false,
            formData: {
                email: '',
                password: '',
                passwordConfirmation: '',
            },
            lastApiResponse: {
                status: 200,
                response: '',
            },
            snackBar: false,
            apiLoading: false,
            errors: {
                email: '',
                password: '',
                passwordConfirmation: '',
            },
        };

        this.passwordConfirmationRef = React.createRef<HTMLInputElement>();
        this.onVerificationRequest = this.onVerificationRequest.bind(this);
        this.onSnackBarClose = this.onSnackBarClose.bind(this);
    }

    handleEmailChange = (event) => {
        const { formType, formData, errors } = this.state;
        const email = event.target.value.trim();

        if (email) {
            let emailError = '';
            if (!email.match(AuthRegEx.email)) {
                emailError = formMessages.malformedEmail;
            } else if (formType === formTypes.register) {
                // async
                emailExists(email)
                    .then((response) => {
                        const { meta } = response.data;
                        if (meta.exists) emailError = meta.description;
                        this.setState({
                            formData: { ...formData, email },
                            errors: { ...errors, email: emailError },
                        });
                        return;
                    })
                    .catch((error) => {
                        console.log(error.response.data.errors);
                    });
            }

            this.setState({
                formData: { ...formData, email },
                errors: { ...errors, email: emailError },
            });
        }
    };

    handlePasswordChange = (event) => {
        const { formData, errors } = this.state;

        const password = event.target.value.trim();
        let confirmedPassword = '';

        if (password) {
            const passwordError = !password.match(AuthRegEx.password)
                ? formMessages.malformedPassword
                : '';

            const confirmedRefTarget = this.passwordConfirmationRef.current;
            confirmedPassword = confirmedRefTarget
                ? confirmedRefTarget.value
                : formData.passwordConfirmation || '';

            const passwordConfirmationError =
                confirmedPassword && password !== confirmedPassword
                    ? formMessages.notMatchingPasswords
                    : '';
            this.setState({
                formData: { ...formData, password },
                errors: {
                    ...errors,
                    password: passwordError,
                    passwordConfirmation: passwordConfirmationError,
                },
            });
        } else this.setState({ formData: { ...formData, password } });
    };

    handlePasswordConfirmation = (event) => {
        const { formData, errors } = this.state;

        const passwordConfirmation = event.target.value.trim();

        const passwordConfirmationError =
            passwordConfirmation !== formData.password
                ? formMessages.notMatchingPasswords
                : '';

        this.setState({
            formData: { ...formData, passwordConfirmation },
            errors: {
                ...errors,
                passwordConfirmation: passwordConfirmationError,
            },
        });
    };

    handleTransition = () => {
        this.setState({
            formType: formNavigation[this.state.formType].linksToType,
            disabledRegistration: false,
        });
    };

    resetPasswordTransition = () => {
        this.setState({ formType: formTypes.resetPassword });
    };

    onVerificationRequest = () => {
        const { lastApiResponse } = this.state;
        this.setState({ apiLoading: true, snackBar: false });

        onResendVerification(this.state.formData)
            .then((response) => {
                const { meta } = response.data;
                this.setState({
                    lastApiResponse: {
                        ...lastApiResponse,
                        ...{
                            status: +meta.status,
                            response: meta.description,
                        },
                    },
                    apiLoading: false,
                    snackBar: true,
                });
            })
            .catch((error) => {
                this.setState({ apiLoading: false });
            });
    };

    onSnackBarClose = () => {
        this.setState({ snackBar: false });
    };

    handleSubmit = () => {
        const { formData, errors, apiLoading, lastApiResponse } = this.state;

        if (!apiLoading) {
            switch (this.state.formType) {
                case formTypes.register:
                    if (canRegister(formData, errors)) {
                        this.setState({ apiLoading: true });
                        registerUser(formData)
                            .then((response) => {
                                this.setState({
                                    lastApiResponse: {
                                        ...lastApiResponse,
                                        ...{
                                            status: +response.status,
                                            response: formMessages.userCreated,
                                        },
                                    },
                                    apiLoading: false,
                                    disabledRegistration: true,
                                    snackBar: true,
                                });
                            })
                            .catch((error) => {
                                const apiErrors = error.response.data.errors;
                                const status = +apiErrors.status;
                                let response = formMessages.apiResponseFallback;

                                if (apiErrors && status !== 422) {
                                    response = apiErrors.description;
                                } else if (status === 422) {
                                    response = apiErrors.title;
                                }

                                this.setState({
                                    lastApiResponse: {
                                        ...lastApiResponse,
                                        ...{ status, response },
                                    },
                                    apiLoading: false,
                                    snackBar: true,
                                });
                            });
                    }
                    break;
                case formTypes.login:
                    if (canLogin(formData, errors)) {
                        this.setState({ apiLoading: true });
                        loginUser(formData)
                            .then((response) => {
                                this.setState({
                                    lastApiResponse: {
                                        ...lastApiResponse,
                                        ...{
                                            status: +response.status,
                                            response: response.data.description,
                                        },
                                    },
                                    apiLoading: false,
                                    snackBar: true,
                                });
                            })
                            .catch((error) => {
                                const apiErrors = error.response.data.errors;
                                const status = +apiErrors.status;
                                let response = formMessages.apiResponseFallback;

                                if (apiErrors && status !== 422) {
                                    response = apiErrors.description;
                                } else if (status === 422) {
                                    response = apiErrors.title;
                                }

                                this.setState({
                                    lastApiResponse: {
                                        ...lastApiResponse,
                                        ...{ status, response },
                                    },
                                    apiLoading: false,
                                    snackBar: true,
                                });
                            });
                    }
                    break;
                case formTypes.resetPassword:
                    const { email } = formData;
                    if (canReset(email, errors.email)) {
                        this.setState({ apiLoading: true });
                        resetPasswordEmail(email)
                            .then((response) => {
                                const { meta } = response.data;
                                this.setState({
                                    lastApiResponse: {
                                        ...lastApiResponse,
                                        ...{
                                            status: +meta.status,
                                            response: meta.description,
                                        },
                                    },
                                    apiLoading: false,
                                    snackBar: true,
                                });
                            })
                            .catch((error) => {
                                const apiErrors = error.response.data.errors;
                                this.setState({
                                    lastApiResponse: {
                                        ...lastApiResponse,
                                        ...{
                                            status: +apiErrors.status,
                                            response:
                                                formMessages.apiResponseFallback,
                                        },
                                    },
                                    apiLoading: false,
                                    snackBar: true,
                                });
                            });
                    }
                    break;
                default:
                    break;
            }
        }
    };

    render() {
        const { classes } = this.props;
        const {
            formType,
            apiLoading,
            lastApiResponse: { status, response },
            snackBar,
            errors,
            disabledRegistration,
            formData: { password, passwordConfirmation },
        } = this.state;
        const {
            action,
            description,
            navigationLabel,
            linksToType,
        } = formNavigation[formType];

        let emailError = errors.email;
        if (
            formType !== formTypes.register &&
            emailError !== formMessages.malformedEmail
        ) {
            emailError = '';
        }

        const passwordError = errors.password;
        const passwordConfirmationError = errors.passwordConfirmation;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {description}
                    </Typography>
                    <div className={classes.testAuthContainer}>
                        <InputLabel>{navigationLabel}</InputLabel>
                        <Button
                            variant={
                                disabledRegistration ? 'contained' : 'text'
                            }
                            color="primary"
                            onClick={this.handleTransition}
                        >
                            {formNavigation[linksToType].description}
                        </Button>
                    </div>
                    {apiLoading && <CircularProgress />}
                    <form className={classes.form}>
                        <FormControl
                            margin="normal"
                            required={true}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus={true}
                                onChange={this.handleEmailChange}
                                error={!!emailError}
                                required={true}
                            />
                            {emailError && (
                                <Typography color="error">
                                    {emailError}
                                </Typography>
                            )}
                        </FormControl>
                        {(formType === formTypes.register ||
                            formType === formTypes.login) && (
                                <FormControl
                                    margin="normal"
                                    required={true}
                                    fullWidth={true}
                                >
                                    <InputLabel htmlFor="password">
                                        Password
                                </InputLabel>
                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={this.handlePasswordChange}
                                        error={!!passwordError}
                                        required={true}
                                        value={password}
                                    />
                                    {passwordError && (
                                        <Typography color="error">
                                            {passwordError}
                                        </Typography>
                                    )}
                                </FormControl>
                            )}
                        {formType === formTypes.register && (
                            <FormControl
                                margin="normal"
                                required={true}
                                fullWidth={true}
                            >
                                <InputLabel htmlFor="confirmPassword">
                                    Confirm password
                                </InputLabel>
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirmation-password"
                                    inputRef={this.passwordConfirmationRef}
                                    onChange={this.handlePasswordConfirmation}
                                    error={!!passwordConfirmationError}
                                    required={true}
                                    value={passwordConfirmation}
                                />
                                {passwordConfirmationError && (
                                    <Typography color="error">
                                        {passwordConfirmationError}
                                    </Typography>
                                )}
                            </FormControl>
                        )}
                        <Button
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                            disabled={disabledRegistration}
                        >
                            {action}
                        </Button>
                        {formType === formTypes.login && (
                            <Button
                                variant="text"
                                color="secondary"
                                fullWidth={true}
                                className={classes.submit}
                                onClick={this.resetPasswordTransition}
                            >
                                {
                                    formNavigation[formTypes.resetPassword]
                                        .description
                                }
                            </Button>
                        )}
                    </form>
                </Paper>
                {snackBar && response && (
                    <SimpleSnackBar
                        open={snackBar}
                        notification={response}
                        onSnackbarClose={this.onSnackBarClose}
                        onClickLabel="Resend"
                        onSnackbarClick={
                            formType === formTypes.login && status === 403
                                ? this.onVerificationRequest
                                : undefined
                        }
                    />
                )}
            </main>
        );
    }
}

export default withStyles(styles)(AuthForm);
