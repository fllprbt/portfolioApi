import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { withTheme } from './utils';

import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */
interface ICSRF extends Element {
    content: string;
}

const env = process.env.NODE_ENV;
if (env !== 'test') {
    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]'
    ) as ICSRF;
    if (csrfToken) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] =
            csrfToken.content;
    } else {
        console.log(
            'No CSRF token: https://laravel.com/docs/csrf#csrf-x-csrf-token'
        );
    }

    const app = document.getElementById('app');
    if (app) {
        const { token: passwordResetToken } = app.dataset;
        ReactDOM.render(withTheme(<App token={passwordResetToken} />), app);
    } else throw new Error('Unable to load ReactJS application!');
}
