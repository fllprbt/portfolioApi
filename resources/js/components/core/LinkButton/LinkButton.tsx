import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { NavigationContext } from 'api/App';

interface IProps {
    link: string;
    label?: string;
}

export const LinkButton = ({ link, label }: IProps) => (
    <Button
        component={React.forwardRef<HTMLAnchorElement, Partial<LinkProps>>(
            (props, ref) => (
                <Link to={link} {...props} ref={ref as any} />
            )
        )}
        color="primary"
        onClick={React.useContext(NavigationContext)}
    >
        {label}
    </Button>
);
