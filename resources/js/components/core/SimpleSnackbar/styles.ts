import { createStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
    createStyles({ snackbarClose: { padding: theme.spacing.unit / 2 } });
