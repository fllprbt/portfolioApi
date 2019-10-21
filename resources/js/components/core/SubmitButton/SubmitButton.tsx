import * as React from 'react';
import { Button, withStyles, WithStyles } from '@material-ui/core/';

import { styles } from './styles';

interface IProps extends WithStyles<typeof styles> {
    children?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const BaseSubmitButton = ({ children, disabled, onClick, classes }: IProps) => (
    <Button
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onClick}
        disabled={disabled || true}
    >
        {children}
    </Button>
);

export const SubmitButton = withStyles(styles)(BaseSubmitButton);
