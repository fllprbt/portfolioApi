import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './bootstrap';

import { FormTypes } from 'api/constants';
import { withTheme } from 'api/utils/';

import {
    LoginForm,
    PasswordResetForm,
    RegistrationForm,
    Welcome,
} from 'api/components';
import { SuccessCard } from 'api/components/core';

interface IProps {
    viewName?: string;
    token?: string;
}

type TNavigationContext = () => void | null;

export const NavigationContext = createContext<TNavigationContext>(() => null);

const getComponentFromViewName = (viewName: string, token?: string) => {
    if (viewName === 'verified') {
        return <SuccessCard type={FormTypes.verify} />;
    } else if (viewName === 'already_verified') {
        return <SuccessCard type={FormTypes.verified} />;
    } else if (viewName === 'reset_password' && token) {
        return <PasswordResetForm token={token} />;
    }

    return <React.Fragment />;
};

const App: React.FC<IProps> = ({
    viewName: viewNameProp,
    token: tokenProp,
}) => {
    const [state, setState] = useState({
        viewName: viewNameProp || '',
        token: tokenProp || '',
    });

    const { token, viewName } = state;

    const resetAppState = () => setState({ viewName: '', token: '' });

    useEffect(() => {
        createContext(resetAppState);
    }, []);

    return (
        <NavigationContext.Provider value={resetAppState}>
            <Router>
                <>
                    <Route exact={true} path="/" component={Welcome} />
                    <Route
                        path={`/${FormTypes.register}`}
                        component={RegistrationForm}
                    />
                    <Route path={`/${FormTypes.login}`} component={LoginForm} />
                    {getComponentFromViewName(viewName, token)}
                </>
            </Router>
        </NavigationContext.Provider>
    );
};

const app = document.getElementById('app');
if (app) {
    const { viewname, token } = app.dataset;
    ReactDOM.render(
        withTheme(<App viewName={viewname} token={token} />),
        document.getElementById('app')
    );
} else throw new Error('Unable to load ReactJS application!');
