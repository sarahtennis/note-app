import React from 'react';
import axios from 'axios';

import Editor from './Editor';

class CreateNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      textBody: '',
      tags: []
    }
  }

  onChange = (event) => {
    let input = event.target;
    this.setState({ [input.name]: input.value });
  }

  onSubmit = event => {
    event.preventDefault();
    const token = localStorage.getItem('unimportant');
    const headers = { authorization: token };

    if (this.state.title && this.state.textBody) {
      const newNote = Object.assign({}, { title: this.state.title, textBody: this.state.textBody });
      axios.post(`https://tennis-notes.herokuapp.com/api/users/newNote`, newNote, { headers })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  render() {
    return (
      <div className="create-note">
        <h3>Create Note</h3>
        <form className="create-note-form" onSubmit={this.onSubmit}>
          <label>
            Title
          </label>
          <input type="text" name="title" placeholder="Title" onChange={this.onChange}></input>
          <label>
            Content
          </label>
          {/* <textarea name="textBody" placeholder="Content" onChange={this.onChange}>
          </textarea> */}
          <Editor />
          <label>
            Tags
          </label>
          <input type="text" name="tags" placeholder="Tags" onChange={this.onChange}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateNote;