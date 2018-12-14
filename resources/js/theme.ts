import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: blue,
        secondary: pink,
    },
});

export default theme;
