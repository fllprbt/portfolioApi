import { createStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${theme.spacing(2)}px ${theme.spacing(
                3
            )}px ${theme.spacing(3)}px`,
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        buttonWrapper: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            paddingTop: theme.spacing(3),
        },
    });
