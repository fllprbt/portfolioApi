import React from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { IPasswordResetFormData } from 'api/interfaces';

import { FormData, FormMessages, FormTypes } from 'api/constants';

import { Form } from 'api/components/core/';

interface IProps {
    token: string;
}

interface IState {
    disabled: boolean;
    passwordResetFormData: IPasswordResetFormData;
    submitted: boolean;
}

const TYPE = FormTypes.resetPassword;

export class PasswordResetForm extends React.Component<IProps, IState> {
    private formRef: React.RefObject<ValidatorForm>;

    constructor(props: IProps) {
        super(props);

        this.state = {
            passwordResetFormData: {
                email: '',
                password: '',
                passwordConfirmation: '',
                token: props.token
            },
            disabled: false,
            submitted: false
        };

        this.formRef = React.createRef();
    }

    componentDidMount() {
        ValidatorForm.addValidationRule(
            'isPasswordMatch',
            (value) => value === this.state.passwordResetFormData.password
        );
    }

    /**
     * Updates the form's changed input field
     */
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { passwordResetFormData } = this.state;
        passwordResetFormData[e.target.name] = e.target.value;
        this.setState({ passwordResetFormData });
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
        const { passwordResetFormData, disabled } = this.state;
        const {
            requiredField,
            notMatchingPasswords,
            malformedEmail
        } = FormMessages;

        return (
            <ValidatorForm
                ref={this.formRef}
                onSubmit={() => null}
                onError={this.handleError}
            >
                <Form
                    formData={passwordResetFormData}
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
                        value={passwordResetFormData.email}
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
                        value={passwordResetFormData.password}
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
                        value={passwordResetFormData.passwordConfirmation}
                    />
                </Form>
            </ValidatorForm>
        );
    }
}
