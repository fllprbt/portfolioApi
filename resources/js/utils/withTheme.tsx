import * as React from 'react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

const withTheme = (component) => (
    <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>
);

export default withTheme;
