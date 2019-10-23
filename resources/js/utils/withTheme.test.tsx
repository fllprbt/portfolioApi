import React from 'react';
import { mount } from 'enzyme';
import { useTheme } from '@material-ui/core';

import { withTheme } from 'api/utils/';
import { theme } from 'api/theme';

const Child = () => {
    expect(useTheme().palette.primary.main).toMatch(theme.palette.primary.main);
    return null;
};

describe('Theme provider', () => {
    it('Passes the theme to a child', () => {
        const ThemedChild = mount(withTheme(<Child />, theme));

        const AppComponent = ThemedChild.find(Child);
        expect(AppComponent.length).toEqual(1);
        expect(AppComponent.equals(<Child />));

        ThemedChild.unmount();
    });
});
