<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'WelcomeController@index')->name('welcome');

/* Includes registration form, login test, reset password */
Route::view('/authorize', 'register'); /* Account creation and status management */

Route::post('/register', 'Auth\Register@register')->name('user.register');
Route::get('/verifyemail/{token}', 'Auth\Register@verify')->name('user.verify');

Route::get('/reset/{token}', 'Auth\ResetPassword@showResetForm')->name('password.reset');
Route::post('/password/email', 'Auth\ForgotPassword@sendResetLinkEmail')->name('password.email');
Route::post('/password/reset', 'Auth\ResetPassword@reset')->name('password.update');
