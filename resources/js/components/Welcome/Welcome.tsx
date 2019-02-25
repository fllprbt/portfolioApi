import * as React from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import {
    Button,
    CssBaseline,
    IconButton,
    Paper,
    Typography,
} from '@material-ui/core/';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { GithubCircle } from 'mdi-material-ui';

import { FormTypes } from '../../constants';
import styles from './styles';

interface IProps extends WithStyles<typeof styles> {}

const toRegister = (props) => <Link to={`/${FormTypes.register}`} {...props} />;

const Welcome = ({
    classes: { main, button, paper, italic, subheading },
}: IProps) => (
    <main className={main}>
        <CssBaseline />
        <Paper className={paper}>
            <Typography variant="h3" gutterBottom={true}>
                Portfolio API
            </Typography>
            <Typography variant="h6" gutterBottom={true}>
                This project is under development
            </Typography>
            <Typography
                className={classNames([italic, subheading])}
                variant="subtitle2"
                gutterBottom={true}
            >
                The OAuth endpoints require a verified user
            </Typography>
            <Button
                component={toRegister}
                variant="contained"
                className={button}
                color="primary"
            >
                Create an Account
            </Button>
            <IconButton href="https://github.com/fllprbt/portfolioApi">
                <GithubCircle />
            </IconButton>
        </Paper>
    </main>
);

export default withStyles(styles)(Welcome);
