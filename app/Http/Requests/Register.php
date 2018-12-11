<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Register extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
			'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'name' => 'string|max:255',
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
            'email.required' => 'Email is required',
            'email.email' => 'Malformed email',
            'email.string' => 'Email should be a string',
            'email.max' => 'Email exceeds 255 characters',
            'email.unique' => 'Email exists',

            'password.required' => 'Password is required',
            'password.string' => 'Password should be a string',
            'password.min' => 'Password is less than 8 characters',
            'password.confirmed' => 'Passwords do not match',

            'name.string' => 'Name should be a string',
            'name.max' => 'Name exceeds 255 characters',
        ];
    }
}
