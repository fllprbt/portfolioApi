import * as React from 'react';
import { Link } from 'react-router-dom';

import { Button, withStyles, WithStyles } from '@material-ui/core/';

import { ResetNavigationConsumer } from '../../../app';

import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
    link: string;
    label?: string;
}

const LinkButton = ({ classes, link, label }: IProps) => (
    <ResetNavigationConsumer>
        {(resetNavigation) => (
            <Button
                component={(props) => <Link to={link} {...props} />}
                color="primary"
                className={classes.changeMenu}
                onClick={resetNavigation}
            >
                {label}
            </Button>
        )}
    </ResetNavigationConsumer>
);

LinkButton.defaultProps = {
    link: '/',
    label: '',
};

export default withStyles(styles)(LinkButton);
