<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Register as RegisterRequest;
use App\Http\Requests\EmailExists;
use App\Jobs\SendVerificationEmail;
use Illuminate\Auth\Events\Registered;

use App\Models\User;
use App\Models\Email;
use response;
use Hash;

class Register extends Controller
{

	/**
	 * Create a new user instance after a valid registration.
	 *
	 * @param  array  $data
	 * @return \App\User
	 */
	protected function create(array $data)
	{
		return User::create([
			'name' => array_key_exists('name', $data) ? $data['name'] : null,
			'email' => $data['email'],
			'password' => bcrypt($data['password']),
			'email_token' => str_random(40),
		]);
	}

	/**
	* Handle a registration request for the application.
	*
	* @param \Illuminate\Http\Requests\Register $request
	* @return \Illuminate\Http\Response
	*/
	public function register(RegisterRequest $request)
	{        
        $name = $request->has('name') ? $request->get('name') : null;
        $email = $request->get('email');
        $password = $request->get('password');
		
		event(new Registered($user = $this->create($request->all())));

		dispatch(new SendVerificationEmail($user));

		return response()->json('A verification email has been sent to ' . $email);
	}

	/**
	* Handle a registration request for the application.
	*
	* @param $token
	* @return \Illuminate\Http\Response
	*/
	public function verify($token)
	{
		$user = User::where('email_token', $token)->first();
		$user->verified = 1;
		if ($user->save()) return view('email.emailconfirm',['user' => $user]);
	}

    /**
	* Check if an email exists
	*
	* @param \Illuminate\Http\Requests\EmailExists $request
	* @return \Illuminate\Http\Response
	*/
    public function emailExists(EmailExists $request)
    {	
		$validated = $request->validated();
        $email_exists = Email::exists($request->email);
        
        return response()->json([
            'email' => $request->email,
            'exists' => $email_exists
        ]);
    }
}
