import React from 'react';

class CreateNote extends React.Component {
  render() {
    return (
      <div className="create-note">
        <h3>Create Note</h3>
        <form className="create-note-form">
          <label>
            Title
          </label>
          <input type="text" name="title" placeholder="Title"></input>
          <label>
            Content
          </label>
          <textarea name="content" placeholder="Content">
          </textarea>
          <label>
            Tags
          </label>
          <input type="text" name="tags" placeholder="Tags"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateNote;