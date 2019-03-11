import React from 'react';
import axios from 'axios';

class NoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      id: ''
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    if (this.state.id !== Number(this.props.match.params.id)) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const token = localStorage.getItem('unimportant');
    const options = {
      headers: {
        authorization: token
      }
    };
    const id = Number(this.props.match.params.id);

    axios.get(`https://tennis-notes.herokuapp.com/api/notes/${id}`, options)
      .then(response => {
        this.setState({ note: response.data[0], id })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="note-view">
        {this.state.note.title}
        {this.state.note.textBody}
      </div>
    )
  }
}

export default NoteView;