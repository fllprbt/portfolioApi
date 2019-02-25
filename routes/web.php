<?php

/**
 * These front-end routes link to the same view but pass a different view_name
 */
Route::get('/', 'Welcome@index')->name('welcome');
Route::get('/register', 'Auth\Register@index')->name('register');
Route::get('/login', 'Auth\Login@index')->name('login');

Route::post('/register', 'Auth\Register@register')->name('user.register');
Route::post('/resend', 'Auth\Register@resendMail')->name('user.resendEmail');
Route::get('/verify/{token}', 'Auth\Register@verify')->name('user.verify');

Route::get('/reset/{token}', 'Auth\ResetPassword@showResetForm')->name('password.reset');
Route::post('/password/email', 'Auth\ForgotPassword@sendResetLinkEmail')->name('password.email');
Route::post('/password/reset', 'Auth\ResetPassword@reset')->name('password.update');
