import * as React from 'react';
import { Link } from 'react-router-dom';

import { NavigationContext } from 'api/app';

import { Button } from '@material-ui/core/';

interface IProps {
    link: string;
    label?: string;
}

const LinkButton = ({ link, label }: IProps) => (
    <Button
        component={(props) => <Link to={link} {...props} />}
        color="primary"
        onClick={React.useContext(NavigationContext)}
    >
        {label}
    </Button>
);

LinkButton.defaultProps = {
    link: '/',
    label: '',
};

export default LinkButton;
