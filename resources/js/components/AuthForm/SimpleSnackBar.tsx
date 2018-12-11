import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
    open: string;
    onSnackbarClose: (event: React.SyntheticEvent) => void;
}

const SimpleSnackBar: React.SFC<IProps> = ({
    open,
    onSnackbarClose,
    classes,
}) => (
    <div>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open ? true : false}
            autoHideDuration={6000}
            onClose={onSnackbarClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{open}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.snackbarClose}
                    onClick={onSnackbarClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    </div>
);

export default withStyles(styles)(SimpleSnackBar);
