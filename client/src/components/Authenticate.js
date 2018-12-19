import React from 'react';

import LoginRegister from '../components/LoginRegister.js';

const Authenticate = PassedComponent =>
    class extends React.Component {
        render() {
            if (window.localStorage.getItem('username')) {
                return <PassedComponent />
            } else {
                return <LoginRegister />
            }
        };
    }

export default Authenticate;