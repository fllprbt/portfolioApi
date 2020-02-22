import React from 'react';
import {
    Avatar,
    Paper,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core/';

import { FormData } from 'api/constants';

import { styles } from './styles';

import { LinkButton, SubmitButton } from '../..';

interface IProps extends WithStyles<typeof styles> {
    title?: string;
    disabled?: boolean;
    linksTo?: string;
    icon?: JSX.Element;
    children?: React.ReactNode;
    onSubmit(): void;
}

export const BaseFormContent: React.FC<IProps> = ({
    title,
    linksTo,
    classes,
    icon,
    children,
    onSubmit,
    disabled
}) => {
    const { paper, avatar, buttonWrapper } = classes;

    return (
        <Paper className={paper}>
            {icon && <Avatar className={avatar}>{icon}</Avatar>}
            <Typography variant="h5">{title}</Typography>
            <br />
            {children}
            <div className={buttonWrapper}>
                {linksTo && (
                    <LinkButton
                        link={`/${linksTo}`}
                        label={FormData[linksTo].title}
                    />
                )}
                <SubmitButton onClick={onSubmit} disabled={disabled}>
                    Submit
                </SubmitButton>
            </div>
        </Paper>
    );
};

export const FormContent = withStyles(styles)(BaseFormContent);
