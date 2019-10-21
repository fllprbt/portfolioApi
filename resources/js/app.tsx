import React, { createContext, useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
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

    const renderComponentFromViewName = (
        name: string | null
    ): React.ReactElement => {
        let component = <React.Fragment />;
        if (name === 'verified') {
            component = <SuccessCard type={FormTypes.verify} />;
        } else if (name === 'already_verified') {
            component = <SuccessCard type={FormTypes.verified} />;
        } else if (name === 'reset_password' && token) {
            component = <PasswordResetForm token={token} />;
        }

        return component;
    };

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
                    {renderComponentFromViewName(viewName)}
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
