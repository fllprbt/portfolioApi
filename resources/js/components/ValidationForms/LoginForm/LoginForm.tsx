import * as React from 'react';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { FormData, FormMessages, FormTypes } from '../../../constants';
import { ILoginFormData } from '../../../interfaces';
import { Form } from '../../core/';

interface IState {
    disabled: boolean;
    loginFormData: ILoginFormData;
    submitted: boolean;
}

const TYPE = FormTypes.login;

class LoginForm extends React.Component<{}, IState> {
    private formRef: React.RefObject<HTMLInputElement>;

    constructor(props: {}) {
        super(props);

        this.state = {
            loginFormData: { email: '', password: '' },
            disabled: false,
            submitted: false,
        };

        this.formRef = React.createRef();
    }

    /**
     * Updates the form's changed input field
     */
    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { loginFormData } = this.state;
        loginFormData[e.target.name] = e.target.value;
        this.setState({ loginFormData });
    };

    /**
     * Disables the submit button on form validation error
     */
    handleError = (): void => {
        // @ts-ignore
        this.setState({ disabled: !this.formRef.current.isFormValid() });
    };

    /**
     * Calls the handleSubmit callback of the Form child
     */
    onSubmit = (handleSubmit): void => handleSubmit();

    render() {
        const { loginFormData, disabled } = this.state;
        const { requiredField, malformedEmail } = FormMessages;
        return (
            <ValidatorForm
                ref={this.formRef}
                onSubmit={this.onSubmit}
                onError={this.handleError}
            >
                <Form
                    formData={loginFormData}
                    disabled={disabled}
                    onSubmit={this.onSubmit}
                    type={TYPE}
                    title={FormData[TYPE].title}
                >
                    <TextValidator
                        validatorListener={this.handleError}
                        label="Email"
                        onChange={this.handleChange}
                        name="email"
                        value={loginFormData.email}
                        validators={['required', 'isEmail']}
                        errorMessages={[requiredField, malformedEmail]}
                    />
                    <br />
                    <TextValidator
                        validatorListener={this.handleError}
                        label="Password"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        value={loginFormData.password}
                        validators={['required']}
                        errorMessages={[requiredField]}
                    />
                </Form>
            </ValidatorForm>
        );
    }
}

export default LoginForm;
