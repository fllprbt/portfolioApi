import * as React from 'react';

import {
    Avatar,
    Button,
    Paper,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core/';

import CheckIcon from '@material-ui/icons/CheckCircleOutlined';

import LinkButton from 'api/components/core/LinkButton';

import { FormData, FormMessages, FormTypes } from 'api/constants/';

import styles from './styles';

interface IProps extends WithStyles<typeof styles> {
    type: string;
}

const TYPES = {
    [FormTypes.verify]: {
        title: FormMessages.verifiedTitle,
        description: FormMessages.verifiedDescription,
    },
    [FormTypes.verified]: {
        title: FormMessages.alreadyVerifiedTitle,
        description: FormMessages.alreadyVerifiedDescription,
    },
};

const SuccessCard: React.SFC<IProps> = ({
    type,
    classes: { main, paper, avatar, buttonContainer, button },
}) => {
    const { title, description } = TYPES[type];
    const { linksToType } = FormData[type];
    return (
        <main className={main}>
            <Paper className={paper}>
                <Avatar className={avatar}>
                    <CheckIcon />
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom={true}>
                    {title}
                </Typography>
                <Typography paragraph={true}>{description}</Typography>
                <div className={buttonContainer}>
                    <LinkButton
                        link={`/${linksToType}`}
                        label={FormData[linksToType].title}
                    />
                    <Button
                        disabled={true}
                        variant="contained"
                        className={button}
                        color="primary"
                    >
                        API DOCS
                    </Button>
                </div>
            </Paper>
        </main>
    );
};

SuccessCard.defaultProps = {
    type: FormTypes.verify,
};

export default withStyles(styles)(SuccessCard);
