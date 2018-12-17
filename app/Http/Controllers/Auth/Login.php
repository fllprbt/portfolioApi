<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Requests\LoginProxy;
use App\Http\Requests\Login as LoginRequest;
use App\Http\Controllers\Controller;
use App\Models\User;

use Auth;
use Hash;

class Login extends Controller
{
    private $loginProxy;

    public function __construct(LoginProxy $loginProxy)
    {
        $this->loginProxy = $loginProxy;
    }

    /**
	 * Test the login status of a user.
	 *
	 * @param \Illuminate\Http\Requests\Login $request
	 * @return \Illuminate\Http\Response
	*/
    public function testLogin(LoginRequest $request)
    {
        $user = User::where(['email' => $request->email])->first();

        if ($user)
        {
            if (Hash::check($request->password, $user->password))
            {
                if ($user->verified())
                {
                    return response()->json(['meta' => [
                            'status' => '200',
                            'verified' => true,
                            'title' => 'Verified',
                            'description' => 'User with email ' . $user->email . ' can access the API',
                    ]], 200);
                }
                else
                {
                    return response()->json(['errors' => [
                        'status' => '403',
                        'title' => 'Unverified',
                        'description' => 'User with email ' . $user->email . ' is not verified',
                    ]], 403);
                }
            }
            else
            {
                return response()->json(['errors' => [
                    'status' => '401',
                    'title' => 'Unauthenticated',
                    'description' => 'The password of ' . $user->email . ' is wrong',
                ]], 401);
            }
        }

        return response()->json(['errors' => [
            'status' => '404',
            'title' => 'User not found',
            'description' => 'No user with ' . $request->email . ' is found',
        ]], 404);
    }

    public function login(LoginRequest $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        return response($this->loginProxy->attemptLogin($email, $password));
    }

    public function refresh(Request $request)
    {
        return response($this->loginProxy->attemptRefresh());
    }

    public function logout()
    {
        $this->loginProxy->logout();
    }
}
