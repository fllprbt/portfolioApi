<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Register as RegisterRequest;
use App\Http\Requests\Login as LoginRequest;
use App\Http\Requests\EmailExists;
use App\Http\Responses\ErrorResponse;
use App\Jobs\SendVerificationEmail;
use Illuminate\Auth\Events\Registered;

use App\Models\User;
use App\Models\Email;
use App\Http\Resources\User as UserResource;

use Response;
use Hash;

class Register extends Controller
{
	/**
	 * Default route for registration view.
	 *
	 * @return \Illuminate\Http\Response|Illuminate\View\View
	 */
	public function index()
  	{
    	return view('app');
	}
	  
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
			'password' => Hash::make($data['password']),
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
        event(new Registered($user = $this->create($request->all())));
		try {
			dispatch(new SendVerificationEmail($user));

			return response()->json([
				'status' => '201',
				'data' => new UserResource($user)
			], 201);
		}
		catch (\Swift_TransportException $e) {
            return ErrorResponse::generateResponse();
        }
	}

	/**
	* Handle a new verification request of a user.
	*
	* @param \Illuminate\Http\Requests\Login $request
	* @return \Illuminate\Http\Response
	*/
	public function resendMail(LoginRequest $request)
	{
		$user = User::where(['email' => $request->email])->first();

		if ($user)
		{
			if (Hash::check($request->password, $user->password))
        	{
				if (!$user->verified) {
					try {
						dispatch(new SendVerificationEmail($user));

						return response()->json(['meta' => [
								'status' => '202',
								'title' => 'registered',
								'description' => 'An email has been sent to ' . $user->email,
						]]);
					}
					catch (\Swift_TransportException $e) {
						return ErrorResponse::generateResponse();
					}
				}
				else
				{
					return response()->json(['errors' => [
						'status' => '401',
						'title' => 'Unauthenticated',
					]], 401);
				}
			}
			else
			{
				return response()->json(['errors' => [
					'status' => '401',
					'title' => 'Unauthenticated',
				]], 401);
			}
		}

		return response()->json(['errors' => [
			'status' => '404',
			'title' => 'User not found',
		]], 404);
	}

	/**
	* Handle an email verification request for the application. 
	* Redirect on different route, based on whether the user was already verified
	*
	* @param $token
	* @return \Illuminate\Routing\Route
	*/
	public function verify($token)
	{
		$user = User::where('email_token', $token)->first();
		if ($user->verified) return redirect()->route('already_verified');
		
		$user->verified = 1;
		if ($user->save()) return redirect()->route('verification_success');
	}

    /**
	* Check if an email exists
	*
	* @param \Illuminate\Http\Requests\EmailExists $request
	* @return \Illuminate\Http\Response
	*/
    public function testEmail(EmailExists $request)
    {
        $email = $request->email;

        if (Email::exists($email))
        {
            return response()->json(['meta' => [
                'status' => '200',
                'exists' => true,
                'title' => 'Email exists',
                'description' => 'The email ' . $email . ' exists in our database'
            ]]);
        }
        else
        {
            return response()->json(['meta' => [
                'status' => '400',
                'title' => 'Email verified',
                'description' => 'The email ' . $email . ' is already verified'
            ]]);
        }
	}
	
	/**
	* Check if an email exists
	*
	* @param \Illuminate\Http\Requests\EmailExists $request
	* @return \Illuminate\Http\Response
	*/
    public function emailExists(EmailExists $request)
    {
		$email = $request->email;

        return Email::exists($email);
	}
}
