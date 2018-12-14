import * as React from 'react';

import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { GithubCircle } from 'mdi-material-ui';

import styles from '../../styles';

interface IProps extends WithStyles<typeof styles> {}

const Welcome = ({
    classes: { main, button, paper, italic, subheading },
}: IProps) => {
    const onRegister = () => {
        window.open(`${process.env.MIX_APP_DOCKER_URL}/authorize`, '_self');
    };

    return (
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
                    variant="contained"
                    className={button}
                    onClick={onRegister}
                    color="primary"
                >
                    Create an Account
                </Button>
                <IconButton
                    aria-label="Github"
                    href="https://github.com/fllprbt/portfolioApi"
                >
                    <GithubCircle />
                </IconButton>
            </Paper>
        </main>
    );
};

export default withStyles(styles)(Welcome);
