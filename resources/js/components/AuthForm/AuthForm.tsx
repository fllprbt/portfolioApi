import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/LockOutlined';

import { formData, formErrors, formTypes } from '../../constants';
import { emailExists, loginUser, registerUser } from '../../utils';

import styles from './styles';

const emailRe = /\S+@\S+\.\S+/;
const passWordRe = /^(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?=.{8,})/;

interface IProps extends WithStyles<typeof styles> {}

interface IState {
    formType: string;
    email: string;
    emailError: string;
    password?: string;
    passwordError?: string;
    passwordConfirmation?: string;
    passwordConfirmationError?: string;
}

class AuthForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            formType: formTypes.register,
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            passwordConfirmation: '',
            passwordConfirmationError: '',
        };
    }

    private passwordConfirmationRef = React.createRef<HTMLInputElement>();

    handleEmailChange = (event) => {
        const { formType } = this.state;
        const email = event.target.value.trim();

        let emailError = '';
        if (!email.match(emailRe)) {
            if (email) emailError = formErrors.malformedEmail;
        } else if (formType === formTypes.register) {
            emailExists(email).then((resp) => {
                if (resp.data.exists) emailError = formErrors.existingEmail;
                this.setState({ email, emailError });
                return;
            });
        }

        this.setState({ email, emailError });
    };

    handlePasswordChange = (event) => {
        const password = event.target.value.trim();

        let passwordError = '';
        if (!password.match(passWordRe)) {
            if (password) passwordError = formErrors.malformedPassword;
        }

        const passwordConfirmationRef = this.passwordConfirmationRef.current;
        const passwordConfirmationValue = passwordConfirmationRef
            ? passwordConfirmationRef.value
            : '';
        const passwordConfirmationError =
            passwordConfirmationValue && password !== passwordConfirmationValue
                ? formErrors.notMatchingPasswords
                : '';

        this.setState({ password, passwordError, passwordConfirmationError });
    };

    handlePasswordConfirmation = (event) => {
        const passwordConfirmation = event.target.value.trim();

        const passwordConfirmationError =
            passwordConfirmation !== this.state.password
                ? formErrors.notMatchingPasswords
                : '';

        this.setState({ passwordConfirmation, passwordConfirmationError });
    };

    handleSubmit = () => {
        const {
            email,
            emailError,
            password,
            passwordError,
            passwordConfirmation,
            passwordConfirmationError,
        } = this.state;

        if (
            password &&
            passwordConfirmation &&
            !emailError &&
            !passwordError &&
            !passwordConfirmationError
        ) {
            switch (this.state.formType) {
                case formTypes.register:
                    registerUser(email, password, passwordConfirmation).then(
                        (resp) => {
                            console.log(resp);
                        }
                    );
                    break;
                case formTypes.login:
                    loginUser(email, password).then((resp) => {
                        console.log(resp);
                    });
                    break;
                case formTypes.resetPassword:
                default:
                    break;
            }
        }
    };

    render() {
        const { classes } = this.props;
        const {
            formType,
            emailError,
            passwordError,
            passwordConfirmationError,
        } = this.state;
        const { description, navigationLabel, linksToType } = formData[
            this.state.formType
        ];

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
                        <Button color="primary">
                            {formData[linksToType].description}
                        </Button>
                    </div>
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
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(AuthForm);
