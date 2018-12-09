<?php

namespace App\Models;

use App\Models\User;

class Email
{
    public static function exists($email) {
        return User::where('email', '=', $email)->exists();
    }
}
