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
Route::post('/register', 'Auth\Register@register')->name('Register User');

// Route::post('/login', 'Auth\Login@login');
// Route::post('/login/refresh', 'Auth\Login@refresh');
// Route::post('/register/verification/{user}', 'Auth\Register@resend_mail');

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', 'Auth\Login@logout');
});
