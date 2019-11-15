<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Application;
use Infrastructure\Auth\Exceptions\InvalidCredentialsException;
use App\Models\User;
use GuzzleHttp\Client;
use DB;

class LoginProxy
{
    const REFRESH_TOKEN = 'refreshToken';

    private $auth;

    private $cookie;

    private $db;

    private $request;

    public function __construct(Application $app) {
        $this->auth = $app->make('auth');
        $this->cookie = $app->make('cookie');
        $this->db = $app->make('db');
        $this->request = $app->make('request');
    }

    /**
     * Attempt to create an access token using user credentials
     *
     * @param string $email
     * @param string $password
     * @return \Illuminate\Http\Response
     */
    public function attemptLogin($email, $password)
    {
        return $this->proxy('password', [
            'username' => $email,
            'password' => $password
        ]);
    }

    /**
     * Attempt to refresh the access token used a refresh token that
     * has been saved in a cookie
     *
     * @return \Illuminate\Http\Response
     */
    public function attemptRefresh()
    {
        $refreshToken = $this->request->cookie(self::REFRESH_TOKEN);

        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }

    /**
     * Proxy a request to the OAuth server.
     *
     * @param string $grantType what type of grant type should be proxied
     * @param array $data the data to send to the server
     */
    public function proxy($grantType, array $data = [])
    {
        try
        {
            $password_granted = 
                DB::table('oauth_clients')
                    ->having('password_client', '=', 1)
                    ->orderBy('created_at', 'desc')
                    ->first();
            
            $data = array_merge([
                'client_id'     => $password_granted->id,
                'client_secret' => $password_granted->secret,
                'grant_type'    => $grantType
            ], $data);

            $client = new Client();
            $guzzleResponse = $client->post(
                'api.dev/oauth/token', // Backend network alias
                ['form_params' => $data]
            );

        } catch(\GuzzleHttp\Exception\BadResponseException $e) {
            $guzzleResponse = $e->getResponse();
        }

        $response = json_decode($guzzleResponse->getBody());
        if (property_exists($response, "error")) {
            $user = User::where(['email' => $data['username']])->first();
            if (!$user->verified)
            {
                return response()->json(['errors' => [
                    'status' => '403',
                    'title' => 'Unverified',
                    'description' => 'User with email ' . $user->email . ' is not verified',
                ]], 403);
            }
            
            return response()->json(['errors' => [
                'status' => '404',
                'title' => 'User not found',
            ]], 404);
        }

        if (property_exists($response, "access_token")) {
            $cookie = app()->make('cookie');

            // Set the refresh token as an encrypted HttpOnly cookie
            $cookie->queue(
                self::REFRESH_TOKEN,
                $response->refresh_token,
                864000, // expiration, should be moved to a config file
                null,
                null,
                false,
                true // HttpOnly
            );

            return response()->json(['meta' => [
                'status' => '200',
                'accessToken' => $response->access_token,
                'accessTokenExpiration' => $response->expires_in
            ]]);
        }
        else
        {
            return response()->json(['meta' => [
                'status' => '200',
                'accessToken' => $response->access_token,
                'accessTokenExpiration' => $response->expires_in
            ]]);
        }
    }

    /**
     * Logs out the user. We revoke access token and refresh token.
     * Also instruct the client to forget the refresh cookie.
     */
    public function logout()
    {
        $accessToken = $this->auth->user()->token();

        $refreshToken = $this->db
            ->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        $this->cookie->queue($this->cookie->forget(self::REFRESH_TOKEN));
    }
}
