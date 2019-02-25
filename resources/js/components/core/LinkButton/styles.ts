import { createStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
    createStyles({ changeMenu: { marginTop: theme.spacing.unit * 3 } });

export default styles;
