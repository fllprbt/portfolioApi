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
    WithStyles
} from '@material-ui/core/';
import LockIcon from '@material-ui/icons/LockOutlined';

import styles from '../../styles';
import SimpleSnackBar from './SimpleSnackBar';

import { formMessages, formNavigation, formTypes } from '../../constants';
import { IAuthData } from '../../interfaces';
import {
    AuthRegEx,
    emailExists,
    // loginUser,
    onResendVerification,
    registerUser,
    // resetPassword,
} from '../../utils';

export interface IProps extends WithStyles<typeof styles> { }
export interface IState {
    formType: string;
    formData: IAuthData;
    errors: IAuthData;

    disabledRegistration?: boolean;
    apiLoading?: boolean;
    snackBar?: boolean;
    lastApiResponse?: string;
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
            lastApiResponse: '',
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
                emailExists(email).then((response) => {
                    const { meta } = response.data;
                    if (meta.exists) emailError = meta.description;
                    this.setState({
                        formData: { ...formData, email },
                        errors: { ...errors, email: emailError },
                    });
                    return;
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
                : '';

            const passwordConfirmationError =
                confirmedPassword && password !== confirmedPassword
                    ? formMessages.notMatchingPasswords
                    : '';
            this.setState({
                formData: {
                    ...formData,
                    password,
                },
                errors: {
                    ...errors,
                    password: passwordError,
                    passwordConfirmation: passwordConfirmationError,
                },
            });
        }
    };

    handlePasswordConfirmation = (event) => {
        const { formData, errors } = this.state;

        const passwordConfirmation = event.target.value.trim();

        const passwordConfirmationError =
            passwordConfirmation !== formData.password
                ? formMessages.notMatchingPasswords
                : '';

        this.setState({
            formData: {
                ...formData,
                passwordConfirmation,
            },
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
        onResendVerification(this.state.formData);
    };

    onSnackBarClose = () => {
        this.setState({ snackBar: false });
    };

    handleSubmit = () => {
        const { formData, errors, apiLoading } = this.state;

        if (!apiLoading) {
            switch (this.state.formType) {
                case formTypes.register:
                    if (
                        !Object.keys(errors).filter((key) =>
                            Boolean(errors[key])
                        ).length
                    ) {
                        this.setState({ apiLoading: true });
                        registerUser(formData)
                            .then((response) => {
                                const lastApiResponse =
                                    response.status === 201
                                        ? formMessages.userCreated
                                        : '';
                                this.setState({
                                    lastApiResponse,
                                    apiLoading: false,
                                    disabledRegistration: true,
                                    snackBar: true,
                                });
                            })
                            .catch((error) => {
                                const apiErrors = error.response.data.errors;
                                const lastApiResponse = apiErrors
                                    ? apiErrors.title
                                    : formMessages.apiResponseFallback;

                                this.setState({
                                    lastApiResponse,
                                    apiLoading: false,
                                    snackBar: true,
                                });
                            });
                    }
                    break;
                // case formTypes.login:
                //     if (email && password && !emailError && !passwordError) {
                //         loginUser(email, password)
                //             .then((response) => {
                //                 this.setState({
                //                     apiResponse: response.data,
                //                     apiResponseLoading: false,
                //                     disabledSubmit: false,
                //                 });
                //             })
                //             .catch((error) => {
                //                 const { response } = error;
                //                 const apiResponseError =
                //                     response && response.status === 403
                //                         ? formMessages.accountUnverified
                //                         : formMessages.apiResponseError;
                //                 this.setState({
                //                     apiResponse: apiResponseError,
                //                     apiResponseLoading: false,
                //                 });
                //                 console.log(error.response.data);
                //             });
                //     }
                //     break;
                // case formTypes.resetPassword:
                //     if (email && !emailError) {
                //         resetPassword(email)
                //             .then((response) => {
                //                 this.setState({
                //                     apiResponse: response.data,
                //                     apiResponseLoading: false,
                //                     disabledSubmit: true,
                //                 });
                //             })
                //             .catch((error) => {
                //                 this.setState({
                //                     apiResponse: formMessages.apiResponseError,
                //                     apiResponseLoading: false,
                //                 });
                //                 console.log(error.response.data.errors);
                //             });
                //     }
                //     break;
                default:
                    break;
            }
        }
        this.setState({ apiLoading: true });
    };

    render() {
        const { classes } = this.props;
        const {
            formType,
            apiLoading,
            lastApiResponse,
            snackBar,
            errors,
            disabledRegistration,
        } = this.state;
        const {
            action,
            description,
            navigationLabel,
            linksToType,
        } = formNavigation[formType];
        const emailError = errors.email;
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
                                error={emailError !== ''}
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
                                    error={passwordError !== ''}
                                    required={true}
                                />
                                {passwordError && (
                                    <Typography color="error">
                                        {passwordError}
                                    </Typography>
                                )}
                            </FormControl>
                        )}
                        {formType === formTypes.login && (
                            <Button
                                variant="text"
                                color="secondary"
                                fullWidth={true}
                                onClick={this.resetPasswordTransition}
                            >
                                {
                                    formNavigation[formTypes.resetPassword]
                                        .description
                                }
                            </Button>
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
                                    error={passwordConfirmationError !== ''}
                                    required={true}
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
                    </form>
                </Paper>
                {snackBar && lastApiResponse && (
                    <SimpleSnackBar
                        open={snackBar}
                        notification={lastApiResponse}
                        onSnackbarClose={this.onSnackBarClose}
                        onSnackbarClick={this.onVerificationRequest}
                    />
                )}
            </main>
        );
    }
}

export default withStyles(styles)(AuthForm);
