import React, { Component } from 'react';

import { Route } from 'react-router';

import Authenticate from './components/Authenticate.js';
import Navigation from './components/Navigation.js';
import NoteList from './components/NoteList.js';
import CreateNote from './components/CreateNote.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <NoteList />
        <Route path='/create-note' component={CreateNote} />
      </div>
    );
  }
}

export default Authenticate(App);
