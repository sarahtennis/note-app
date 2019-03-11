import React, { Component } from 'react';

import { Route } from 'react-router';

import Authenticate from './components/Authenticate.js';
import Navigation from './components/Navigation.js';
import NoteList from './components/NoteList.js';
import CreateNote from './components/CreateNote.js';
import NoteView from './components/NoteView.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <NoteList />
        <Route exact path='/create-note' component={CreateNote} />
        <Route path='/notes/:id' render={(props) => <NoteView {...props} />} />
      </div>
    );
  }
}

export default Authenticate(App);
