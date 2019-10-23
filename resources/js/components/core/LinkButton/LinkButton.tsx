import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { NavigationContext } from 'api/App';

interface IProps {
    link: string;
    label?: string;
}

export const LinkButton = (props: IProps) => (
    <Button color="primary" onClick={React.useContext(NavigationContext)}>
        <Link to={props.link} {...props} />
    </Button>
);
