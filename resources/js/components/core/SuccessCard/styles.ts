import { createStyles } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) =>
    createStyles({
        main: {
            width: 'auto',
            display: 'block', // Fix IE 11 issue.
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
            [theme.breakpoints.up(400 + theme.spacing(6))]: {
                width: 400,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
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
        buttonContainer: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
        },
        button: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    });
