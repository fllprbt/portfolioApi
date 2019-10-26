import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';

const token = '12345';

describe('CSRF on different environments', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // this is important - it clears the cache
        process.env = { ...OLD_ENV };
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    const addCsrf = require('./addCsrf');

    it('Will fetch token in dev', () => {
        const Meta = mount(<meta name="csrf-token" content={token} />, {
            attachTo: document.head,
        });

        process.env.NODE_ENV = 'dev';

        addCsrf(axios);

        expect(axios.defaults.headers.common['X-CSRF-TOKEN']).toMatch(token);

        Meta.unmount();
    });

    it('Will fetch token in test', () => {
        const Meta = mount(<meta name="csrf-token" content={token} />, {
            attachTo: document.head,
        });

        process.env.NODE_ENV = 'test';

        addCsrf(axios);

        expect(axios.defaults.headers.common['X-CSRF-TOKEN']).toMatch(token);

        Meta.unmount();
    });

    it('Will not error if token does not exist in test environment', () => {
        process.env.NODE_ENV = 'test';

        expect(() => addCsrf(axios));
    });

    it('Will error if token does not exist in non test environment', () => {
        process.env.NODE_ENV = 'dev';

        expect(() => addCsrf(axios)).toThrowError();
    });
});
