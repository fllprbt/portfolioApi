<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/emailExists', 'Auth\Register@emailExists')->name('Email exists');
Route::post('/register', 'Auth\Register@register')->name('Register user');

Route::post('/resetPassword', 'Auth\ForgotPassword@index')->name('Reset password');

Route::post('/testLogin', 'Auth\Login@testLogin')->name('Test login status');
Route::post('/testLogin', 'Auth\Login@testLogin')->name('Reset verification');

Route::post('/login', 'Auth\Login@login')->name('OAuth login');
Route::post('/login/refresh', 'Auth\Register@resendMail')->name('Refresh login');

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', 'Auth\Login@logout');
});
