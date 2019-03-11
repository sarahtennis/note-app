import React from 'react';
import { Link } from 'react-router-dom';

class NoteListCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={`/notes/${this.props.note.id}`}>
        <div className="note-list-card">
          <span>{this.props.note.title}</span>
          <p>{this.props.note.textBody}</p>
        </div>
      </Link>
    )
  }
}

export default NoteListCard;