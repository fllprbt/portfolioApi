<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Requests\LoginProxy;
use App\Http\Requests\Login as LoginRequest;
use App\Http\Controllers\Controller;
use App\Models\User;

use Auth;

class Login extends Controller
{
    private $loginProxy;

    public function __construct(LoginProxy $loginProxy)
    {
        $this->loginProxy = $loginProxy;
    }

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
                            'description' => 'User at email ' . $user->email . ' has been verified',
                    ]]);
                }
                else
                {
                    return response()->json(['meta' => [
                        'status' => '200',
                        'verified' => false,
                        'title' => 'Unverified',
                        'description' => 'User at email ' . $user->email . ' is not verified',
                    ]]);
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
