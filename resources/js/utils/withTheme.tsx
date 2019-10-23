import React from 'react';
import { MuiThemeProvider, Theme } from '@material-ui/core/styles';

import { theme as defaultTheme } from 'api/theme';

/**
 * Wraps a component with a MaterialUI theme
 * @param {React.ReactElement} component - the component to theme
 * @returns {React.ReactElement} the themed component
 */
export const withTheme = (
    component: React.ReactElement,
    theme?: Theme
): React.ReactElement => (
    <MuiThemeProvider theme={theme || defaultTheme}>
        {component}
    </MuiThemeProvider>
);
