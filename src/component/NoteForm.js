import React, { useState } from 'react';

const NoteForm = () => {
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');

  const addNote = () => {
    if (noteContent.trim()) {
      setNotes([...notes, { id: Date.now(), content: noteContent }]);
      setNoteContent('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Sticky Notes</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Write a note..."
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={addNote}>
        Add Note
      </button>
      <div className="row">
        {notes.map(note => (
          <div key={note.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <p className="card-text">{note.content}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteForm;
