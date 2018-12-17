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

/* Check if email exists */
Route::post('/email', 'Auth\Register@emailExists')->name('email.exists');

/* Get info regarding the authentication status of user (misses 0Auth Feedback) */
Route::post('/test/login', 'Auth\Login@testLogin')->name('test.login');

/* OAuth */
Route::post('/login', 'Auth\Login@login')->name('oauth.login');
Route::post('/login/refresh', 'Auth\Register@resendMail')->name('oauth.refresh');
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', 'Auth\Login@logout')->name('oauth.logout');
});
