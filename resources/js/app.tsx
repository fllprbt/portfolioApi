import * as React from 'react';
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
    viewName: string;
    token: string;
}

interface IState {
    viewName: string | null;
    token: string | null;
}

// tslint:disable-next-line
const ResetNavigation = React.createContext(() => {});
export const ResetNavigationConsumer = ResetNavigation.Consumer;

class App extends React.Component<IProps, IState> {
    static defaultProps = { viewName: '', token: '' };

    constructor(props: IProps) {
        super(props);

        this.state = {
            viewName: props.viewName,
            token: props.token,
        };
    }

    resetAppState = () => this.setState({ viewName: null, token: null });

    renderComponentFromViewName = (
        viewName: string | null
    ): React.ReactElement => {
        const { token } = this.state;
        let component = <React.Fragment />;
        if (viewName === 'verified') {
            component = <SuccessCard type={FormTypes.verify} />;
        } else if (viewName === 'already_verified') {
            component = <SuccessCard type={FormTypes.verified} />;
        } else if (viewName === 'reset_password' && token) {
            component = <PasswordResetForm token={token} />;
        }

        return component;
    };

    render() {
        const { viewName } = this.state;
        return (
            <ResetNavigation.Provider value={this.resetAppState}>
                <Router>
                    <>
                        <Route exact={true} path="/" component={Welcome} />
                        <Route
                            path={`/${FormTypes.register}`}
                            component={RegistrationForm}
                        />
                        <Route
                            path={`/${FormTypes.login}`}
                            component={LoginForm}
                        />
                        {this.renderComponentFromViewName(viewName)}
                    </>
                </Router>
            </ResetNavigation.Provider>
        );
    }
}

const app = document.getElementById('app');
if (app) {
    const { viewname, token } = app.dataset;
    ReactDOM.render(
        withTheme(<App viewName={viewname} token={token} />),
        document.getElementById('app')
    );
} else console.error('Unable to load ReactJS application!');
