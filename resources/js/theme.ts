import { blue, pink } from '@material-ui/core/colors/';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: { useNextVariants: true },
    palette: {
        primary: blue,
        secondary: pink,
    },
});

export default theme;
