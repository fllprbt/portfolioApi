/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AuthForm from './components/';

if (document.getElementById('app')) {
    ReactDOM.render(<AuthForm />, document.getElementById('app'));
} else console.error('Unable to load ReactJS application!');
