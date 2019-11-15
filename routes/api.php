<?php

/**
* Authentication endpoints
*/ 
Route::post('/' . env('ROUTE_REGISTER'), 'Auth\Register@register')->name('user.register');
Route::post('/' . env('ROUTE_RESEND_VERIFICATION'), 'Auth\Register@resendMail')->name('user.resendEmail');
Route::post('/' . env('ROUTE_SEND_PASSWORD_RESET_EMAIL'), 'Auth\ForgotPassword@sendResetLinkEmail')->name('password.email');
Route::post('/' . env('ROUTE_RESET_PASSWORD'), 'Auth\ResetPassword@reset')->name('password.update');

/**
 * Authorization endpoints (OAuth)
 */
Route::post('/login', 'Auth\Login@login')->name('oauth.login');
Route::post('/login/refreshToken', 'Auth\Login@refresh')->name('oauth.refresh');
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', 'Auth\Login@logout')->name('oauth.logout');
});

/**
 * Helpers
 */
Route::post('/email', 'Auth\Register@emailExists')->name('email.exists');
Route::post('/' . env('ROUTE_LOGIN'), 'Auth\Login@testLogin')->name('test.login');
