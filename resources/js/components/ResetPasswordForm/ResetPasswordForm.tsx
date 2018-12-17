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

import { formMessages } from '../../constants';
import { IApiResponse } from '../../interfaces';
import { AuthRegEx, resetPassword } from '../../utils';

export interface IProps extends WithStyles<typeof styles> {}
export interface IState {
    password?: string;
    passwordConfirmation?: string;
    passwordError?: string;
    passwordConfirmationError?: string;

    disabledReset?: boolean;
    apiLoading?: boolean;
    snackBar?: boolean;
    lastApiResponse: IApiResponse;
}

const token = window.location.href.split('/').pop() || '';

class ResetPasswordForm extends React.Component<IProps, IState> {
    passwordConfirmationRef: React.RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);
        this.state = {
            password: '',
            passwordConfirmation: '',
            passwordError: '',
            passwordConfirmationError: '',
            disabledReset: false,
            apiLoading: false,
            snackBar: false,
            lastApiResponse: {
                status: 200,
                response: '',
            },
        };

        this.passwordConfirmationRef = React.createRef<HTMLInputElement>();
        this.onSnackBarClose = this.onSnackBarClose.bind(this);
    }

    handlePasswordChange = (event) => {
        const { passwordConfirmation } = this.state;

        const password = event.target.value.trim();
        let confirmedPassword = '';

        if (password) {
            const passwordError = !password.match(AuthRegEx.password)
                ? formMessages.malformedPassword
                : '';

            const confirmedRefTarget = this.passwordConfirmationRef.current;
            confirmedPassword = confirmedRefTarget
                ? confirmedRefTarget.value
                : passwordConfirmation || '';

            const passwordConfirmationError =
                confirmedPassword && password !== confirmedPassword
                    ? formMessages.notMatchingPasswords
                    : '';
            this.setState({
                password,
                passwordError,
                passwordConfirmationError,
            });
        } else this.setState({ password });
    };

    handlePasswordConfirmation = (event) => {
        const passwordConfirmation = event.target.value.trim();

        const passwordConfirmationError =
            passwordConfirmation !== this.state.password
                ? formMessages.notMatchingPasswords
                : '';

        this.setState({
            passwordConfirmation,
            passwordConfirmationError,
        });
    };

    onSnackBarClose = () => {
        this.setState({ snackBar: false });
    };

    handleSubmit = () => {
        const {
            password,
            passwordConfirmation,
            passwordError,
            passwordConfirmationError,
            apiLoading,
            lastApiResponse,
        } = this.state;

        if (!apiLoading) {
            if (
                password &&
                passwordConfirmation &&
                !passwordError &&
                !passwordConfirmationError
            ) {
                this.setState({ apiLoading: true });
                resetPassword(password, passwordConfirmation, token)
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
                            disabledReset: true,
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
        }
    };

    render() {
        const { classes } = this.props;
        const {
            apiLoading,
            password,
            passwordError,
            passwordConfirmation,
            passwordConfirmationError,
            lastApiResponse: { response },
            snackBar,
            disabledReset,
        } = this.state;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset password
                    </Typography>
                    {apiLoading && <CircularProgress />}
                    <form className={classes.form}>
                        <FormControl
                            margin="normal"
                            required={true}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
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
                        <Button
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                            disabled={disabledReset}
                        >
                            Reset password
                        </Button>
                    </form>
                </Paper>
                {snackBar && response && (
                    <SimpleSnackBar
                        open={snackBar}
                        notification={response}
                        onSnackbarClose={this.onSnackBarClose}
                    />
                )}
            </main>
        );
    }
}

export default withStyles(styles)(ResetPasswordForm);
