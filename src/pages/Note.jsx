import React, { useState } from 'react';
import '../App'; // Assuming your styles are in App.css or similar

const colors = ['yellow', 'pink', 'lightblue', 'lightgreen', 'lightcoral'];

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [isEditing, setIsEditing] = useState(null);

  const addNote = () => {
    if (noteText) {
      const currentDateTime = new Date().toLocaleString();
      if (isEditing !== null) {
        const updatedNotes = notes.map((note, index) =>
          index === isEditing ? { ...note, text: noteText, color: selectedColor } : note
        );
        setNotes(updatedNotes);
        setIsEditing(null);
      } else {
        setNotes([...notes, { text: noteText, color: selectedColor, createdAt: currentDateTime }]);
      }
      setNoteText('');
      setSelectedColor('yellow');
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const editNote = (index) => {
    setNoteText(notes[index].text);
    setSelectedColor(notes[index].color);
    setIsEditing(index);
  };

  return (
    <div className="bg-image bg-light p-4 rounded">
      <h1 className="text-center">Sticky Notes</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Select Color</label>
        <select
          className="form-select"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={addNote}>
        {isEditing !== null ? 'Update Note' : 'Add Note'}
      </button>

      <div className="row mt-4">
        {notes.map((note, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card" style={{ backgroundColor: note.color }}>
              <div className="card-body">
                <p className="card-text">{note.text}</p>
                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                  Created at: {note.createdAt}
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-secondary" onClick={() => editNote(index)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteNote(index)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
