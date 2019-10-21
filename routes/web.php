<?php

/**
 * These front-end routes link to the same view, passing a different view_name
 */
Route::get('/', 'Welcome@index')->name('welcome');
Route::get('/verificationError','Auth\Register@index')->name('already_verified');
Route::get('/verificationSuccess', 'Auth\Register@index')->name('verification_success');
Route::get('/register', 'Auth\Register@index')->name('register');
Route::get('/login', 'Auth\Login@index')->name('login');
Route::get('/verify/{token}', 'Auth\Register@verify')->name('user.verify');
Route::get('/reset/{token}', 'Auth\ResetPassword@showResetForm')->name('password.reset');
