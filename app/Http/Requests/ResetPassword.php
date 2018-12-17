<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPassword extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    /**
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'password.required' => 'Password is required',
            'password.string' => 'Password should be a string',
            'password.min' => 'Password is less than 8 characters',
            'password.confirmed' => 'Passwords do not match',
        ];
    }
}
