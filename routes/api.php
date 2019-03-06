<?php

/**
* Authentication endpoints
*/ 
Route::post('/register', 'Auth\Register@register')->name('user.register');
Route::post('/resend', 'Auth\Register@resendMail')->name('user.resendEmail');
Route::post('/password/email', 'Auth\ForgotPassword@sendResetLinkEmail')->name('password.email');
Route::post('/password/reset', 'Auth\ResetPassword@reset')->name('password.update');

/**
 * Authorization endpoints (OAuth)
 */
Route::post('/login', 'Auth\Login@login')->name('oauth.login');
Route::post('/login/refresh', 'Auth\Register@resendMail')->name('oauth.refresh');
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', 'Auth\Login@logout')->name('oauth.logout');
});

/**
 * Helpers
 */
Route::post('/email', 'Auth\Register@emailExists')->name('email.exists');
Route::post('/test/login', 'Auth\Login@testLogin')->name('test.login');
