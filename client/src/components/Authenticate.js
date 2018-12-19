import React from 'react';

import LoginRegister from '../components/LoginRegister.js';

const Authenticate = PassedComponent =>
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                rerender: false
            }
        }

        forceRerender = () => {
            this.setState(prevState => ({rerender: !prevState.rerender}),
            this.setState(prevState => ({rerender: !prevState.rerender})));
        };

        render() {
            if (window.localStorage.getItem('unimportant')) {
                return <PassedComponent />
            } else {
                return <LoginRegister forceRerender={this.forceRerender} />
            }
        };
    }

export default Authenticate;