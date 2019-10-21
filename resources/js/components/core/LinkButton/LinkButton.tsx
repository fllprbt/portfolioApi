import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core/';

import { NavigationContext } from 'api/App';

interface IProps {
    link: string;
    label?: string;
}

export const LinkButton = ({ link, label }: IProps) => (
    <Button
        component={(props) => <Link to={link} {...props} />}
        color="primary"
        onClick={React.useContext(NavigationContext)}
    >
        {label}
    </Button>
);
