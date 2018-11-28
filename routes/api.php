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

Route::post('/login', 'Auth\LoginController@login');
Route::post('/login/refresh', 'Auth\LoginController@refresh');

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', 'Auth\LoginController@logout');
});
