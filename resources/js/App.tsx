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
    token?: string;
}

type TNavigationContext = () => void | null;

export const NavigationContext = createContext<TNavigationContext>(() => null);

const App: React.FC<IProps> = ({ token: tokenProp }) => {
    const [token, setToken] = useState(tokenProp || '');

    const resetAppState = () => setToken('');

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
                    <Route
                        path={`/${FormTypes.verified}`}
                        component={() => (
                            <SuccessCard type={FormTypes.verified} />
                        )}
                    />
                    <Route
                        path={`/${FormTypes.alreadyVerified}`}
                        component={() => (
                            <SuccessCard type={FormTypes.alreadyVerified} />
                        )}
                    />
                    {token && <PasswordResetForm token={token} />}
                </>
            </Router>
        </NavigationContext.Provider>
    );
};

const app = document.getElementById('app');
if (app) {
    const { token } = app.dataset;
    ReactDOM.render(
        withTheme(<App token={token} />),
        document.getElementById('app')
    );
} else throw new Error('Unable to load ReactJS application!');
