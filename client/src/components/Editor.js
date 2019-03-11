import React from 'react';
import Quill from 'quill';

// import { Link } from 'react-router-dom';

class Editor extends React.Component {
  componentDidMount() {
    let toolbarOptions = [];

    let quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    })
  }

  render() {
    return (
      <div className="text-editor">
        <div id="toolbar"></div>
        <div id="editor"></div>
      </div>
    )
  }
}

export default Editor;