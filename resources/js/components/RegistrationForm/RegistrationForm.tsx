import * as React from 'react';
import * as ReactDOM from 'react-dom';

const RegistrationForm = () => {
    return <div>kk</div>;
};

if (document.getElementById('app')) {
    ReactDOM.render(<RegistrationForm />, document.getElementById('app'));
} else console.error('Unable to load ReactJS application!');

export default RegistrationForm;
