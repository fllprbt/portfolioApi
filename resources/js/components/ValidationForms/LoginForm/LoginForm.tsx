import React from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { ILoginFormData } from 'api/interfaces';

import { FormData, FormMessages, FormTypes } from 'api/constants';

import { Form } from 'api/components/core/';

interface IState {
    disabled: boolean;
    loginFormData: ILoginFormData;
    submitted: boolean;
}

const TYPE = FormTypes.login;

export class LoginForm extends React.Component<{}, IState> {
    private formRef: React.RefObject<ValidatorForm>;

    constructor(props: {}) {
        super(props);

        this.state = {
            loginFormData: { email: '', password: '' },
            disabled: false,
            submitted: false
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
        if (this.formRef.current) {
            this.formRef.current
                .isFormValid(true)
                .then((res) => this.setState({ disabled: !res }));
        }
    };

    onSubmit = (handleSubmit: () => void): void => handleSubmit();

    render() {
        const { loginFormData, disabled } = this.state;
        const { requiredField, malformedEmail } = FormMessages;

        return (
            <ValidatorForm
                ref={this.formRef}
                onSubmit={() => null}
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
