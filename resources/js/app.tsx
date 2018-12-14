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

import { AuthForm, Welcome } from './components/';

import { withTheme } from './utils/';

if (document.getElementById('authForm')) {
    ReactDOM.render(
        withTheme(<AuthForm />),
        document.getElementById('authForm')
    );
} else if (document.getElementById('welcome')) {
    ReactDOM.render(withTheme(<Welcome />), document.getElementById('welcome'));
} else console.error('Unable to load ReactJS application!');
