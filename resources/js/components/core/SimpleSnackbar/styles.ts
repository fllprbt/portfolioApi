import { createStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
    createStyles({ snackbarClose: { padding: theme.spacing.unit / 2 } });

export default styles;
