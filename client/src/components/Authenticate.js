import React from 'react';

const Authenticate = PassedComponent =>
    class extends React.Component {
        render() {
            if (window.localStorage.getItem('username')) {
                return <PassedComponent />
            } else {
                return <Login />
            }
        };
    }

export default Authenticate;