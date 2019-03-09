import React from 'react';
import axios from 'axios';

import NoteListCard from './NoteListCard';

// import logo from '../logo.png';

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('unimportant');
    const options = {
      headers: {
        authorization: token
      }
    };
    axios.get(`https://tennis-notes.herokuapp.com/api/users/${token}/notes`, options)
      .then(response => {
        console.log(response);
        if (!response.data.code) {
          this.setState({
            notes: response.data
          })
        }
      })
  }

  render() {
    return (
      <div className="note-list">
        {this.state.notes.length ?
          this.state.notes.forEach(note => {
            return <NoteListCard />
          }) : <div className="no-notes">No Notes in Database </div>}
      </div>
    )
  }
}

export default NoteList;