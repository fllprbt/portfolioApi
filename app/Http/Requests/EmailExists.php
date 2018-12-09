<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailExists extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return ['email' => 'required|email'];
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
        ];
    }
}
