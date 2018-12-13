import React, { Component } from 'react';

import { Route } from 'react-router';

import LoginRegister from './components/LoginRegister';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={ LoginRegister } />
      </div>
    );
  }
}

export default App;
