import * as React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core/';

import { ResetNavigationConsumer } from 'api/app';

interface IProps {
    link: string;
    label?: string;
}

const LinkButton = ({ link, label }: IProps) => (
    <ResetNavigationConsumer>
        {(resetNavigation) => (
            <Button
                component={(props) => <Link to={link} {...props} />}
                color="primary"
                onClick={resetNavigation}
            >
                {label}
            </Button>
        )}
    </ResetNavigationConsumer>
);

LinkButton.defaultProps = {
    link: '/',
    label: ''
};

export default LinkButton;
