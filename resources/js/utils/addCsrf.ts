import { AxiosInstance } from 'axios';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */
interface ICSRF extends Element {
    content: string;
}

export const addCsrf = (axios: AxiosInstance) => {
    // tslint:disable-next-line: no-unsafe-any
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    const csrfToken = document.head.querySelector(
        'meta[name="csrf-token"]'
    ) as ICSRF;
    if (csrfToken) {
        // tslint:disable-next-line: no-unsafe-any
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken.content;
    } else if (process.env.NODE_ENV !== 'test') {
        throw new Error(
            'No CSRF token: https://laravel.com/docs/csrf#csrf-x-csrf-token'
        );
    }
};
