<?php

namespace App\Http\Responses;

use Response;

class ErrorResponse
{
    public static function generateResponse($type = 'email') {
        return response()->json(['errors' => [
            'status' => '530',
            'title' => 'Swift transport exception',
            'description' => 'Mail setup error, ensure your config is set and login to resend 
            your mail',
        ]], 500);
    }
 
}
