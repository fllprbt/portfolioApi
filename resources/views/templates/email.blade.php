@component('mail::message')

# Welcome to my API, verify and have fun!

Please click the following button to verify your account.

@component('mail::button', ['url' => env('APP_URL') . '/verify/' . $user->email_token])

Verify

@endcomponent

Thanks,<br>

PortfolioApi

@endcomponent
