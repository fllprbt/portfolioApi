import * as React from 'react';

import {
    Button,
    IconButton,
    Snackbar,
    WithStyles,
    withStyles,
} from '@material-ui/core/';

import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
    clickLabel?: string;
    open: boolean;
    notification: string;
    onSnackbarClose: (event: React.SyntheticEvent, reason: string) => void;
    onSnackbarClick?: ((event: React.SyntheticEvent) => void) | null;
}

const SimpleSnackbar: React.SFC<IProps> = ({
    clickLabel,
    open,
    notification,
    onSnackbarClose,
    classes,
    onSnackbarClick,
}) => (
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open ? true : false}
        autoHideDuration={6000}
        ContentProps={{ 'aria-describedby': 'message-id' }}
        message={<span id="message-id">{notification}</span>}
        onClose={(e, reason) => onSnackbarClose(e, reason)}
        action={[
            <React.Fragment key="undo">
                {onSnackbarClick && (
                    <Button
                        color="secondary"
                        size="small"
                        onClick={onSnackbarClick}
                    >
                        {clickLabel || 'OK'}
                    </Button>
                )}
            </React.Fragment>,
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.snackbarClose}
                onClick={(e) => onSnackbarClose(e, 'closeButtonClick')}
            >
                <CloseIcon />
            </IconButton>,
        ]}
    />
);

SimpleSnackbar.defaultProps = {
    clickLabel: 'Resend',
    onSnackbarClick: null,
};

export default withStyles(styles)(SimpleSnackbar);
