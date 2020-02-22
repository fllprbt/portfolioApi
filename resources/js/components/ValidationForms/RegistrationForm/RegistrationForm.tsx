import React from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { IRegistrationFormData } from 'api/interfaces';

import { FormData, FormMessages, FormTypes } from 'api/constants';

import { Form } from 'api/components/core/';

interface IState {
    disabled: boolean;
    registerFormData: IRegistrationFormData;
    submitted: boolean;
}

const TYPE = FormTypes.register;

export class RegistrationForm extends React.Component<{}, IState> {
    private formRef: React.RefObject<ValidatorForm>;

    constructor(props: {}) {
        super(props);

        this.state = {
            registerFormData: {
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            disabled: true,
            submitted: false
        };

        this.formRef = React.createRef();
    }

    componentDidMount() {
        ValidatorForm.addValidationRule(
            'isPasswordMatch',
            (value) => value === this.state.registerFormData.password
        );
    }

    /**
     * Updates the form's changed input field
     */
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { registerFormData } = this.state;
        registerFormData[e.target.name] = e.target.value;
        this.setState({ registerFormData });
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
        const { registerFormData, disabled } = this.state;
        const {
            requiredField,
            malformedEmail,
            notMatchingPasswords
        } = FormMessages;

        return (
            <ValidatorForm
                ref={this.formRef}
                onSubmit={() => null}
                onError={this.handleError}
            >
                <Form
                    formData={registerFormData}
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
                        value={registerFormData.email}
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
                        value={registerFormData.password}
                        validators={['required']}
                        errorMessages={[requiredField]}
                    />
                    <br />
                    <TextValidator
                        validatorListener={this.handleError}
                        label="Repeat password"
                        onChange={this.handleChange}
                        name="passwordConfirmation"
                        type="password"
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={[notMatchingPasswords, requiredField]}
                        value={registerFormData.passwordConfirmation}
                    />
                </Form>
            </ValidatorForm>
        );
    }
}
