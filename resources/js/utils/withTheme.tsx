import * as React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'api/theme';

/**
 * Wraps a component with a MaterialUI theme
 * @param {React.ReactElement} component - the component to theme
 * @returns {React.ReactElement} the themed component
 */
const withTheme = (component: React.ReactElement): React.ReactElement => (
    <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>
);

export default withTheme;
