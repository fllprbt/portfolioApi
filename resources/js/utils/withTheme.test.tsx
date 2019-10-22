import React from 'react';
import { shallow } from 'enzyme';

import { withTheme } from 'api/utils/';

import { App } from 'api/App';

describe('Theme provider', () => {
    it('Wraps element with the theme provider', () => {
        const ThemedApp = shallow(withTheme(<App />));
        const AppComponent = ThemedApp.find(App);

        expect(AppComponent.length).toEqual(1);
        expect(AppComponent.equals(<App />));
    });
});
