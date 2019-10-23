import React from 'react';
import { mount } from 'enzyme';
import { useTheme } from '@material-ui/core';

import { withTheme } from 'api/utils/';
import { theme } from 'api/theme';

describe('Theme provider', () => {
    it('Passes the theme to a child', () => {
        const ThemedChild = () => {
            expect(useTheme().palette.primary.main).toMatch(
                theme.palette.primary.main
            );
            return null;
        };
        const ThemedApp = mount(withTheme(<ThemedChild />, theme));

        const AppComponent = ThemedApp.find(ThemedChild);
        expect(AppComponent.length).toEqual(1);
        expect(AppComponent.equals(<ThemedChild />));
    });
});
