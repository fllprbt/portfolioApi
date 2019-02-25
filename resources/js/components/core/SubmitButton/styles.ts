import { createStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
    createStyles({
        submit: {
            marginTop: theme.spacing.unit * 3,
            width: '50%',
        },
    });

export default styles;
