import React from 'react';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import {
    Avatar,
    Button,
    Paper,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core/';

import { FormData, FormMessages, FormTypes } from 'api/constants/';

import { styles } from './styles';

import { LinkButton } from 'api/components/core/LinkButton';

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

const BaseSuccessCard: React.SFC<IProps> = ({
    type,
    classes: { main, paper, avatar, buttonContainer, button },
}) => {
    const { title, description } = TYPES[type || FormTypes.verify];
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

export const SuccessCard = withStyles(styles)(BaseSuccessCard);
