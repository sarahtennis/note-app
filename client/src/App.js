import React, { Component } from 'react';

//import { Route } from 'react-router';

import Authenticate from './components/Authenticate.js';
//import LoginRegister from './components/LoginRegister';

class App extends Component {
  render() {
    return (
      <div className="App">
        Test content
      </div>
    );
  }
}

export default Authenticate(App);
