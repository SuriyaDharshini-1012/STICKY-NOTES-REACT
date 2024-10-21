import React, { useState } from 'react';
import '../App';
const colors = ['LightBlue', 'Maroon', 'Violet', 'Deep Emerald Green', 'LightCoral'];

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
    <div className="bg-image p-3 rounded">
      <h1 className="text-center">Lets start</h1>
      

      <div className="card mb-4" style={{ maxWidth: '400px', margin: 'auto' }}>
        <div className="card-body">
          <div className="mb-3">
            <textarea
              type="text"
              className="form-control form-control-sm"
              placeholder="Content"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              style={{ height: '80px' }} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Select Color</label>
            <select
              className="form-select form-select-sm"
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
          <button className="btn btn-primary btn-sm" onClick={addNote}>
            {isEditing !== null ? 'Update Note' : 'Add Note'}
          </button>
        </div>
      </div>

      {/* Notes Display */}
      <div className="row mt-3">
        {notes.map((note, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card" style={{ backgroundColor: note.color, maxWidth: '250px', minHeight: '150px' }}>
              <div className="card-body" style={{ padding: '10px' }}>
                <p className="card-text" style={{ fontSize: '0.9rem' }}>{note.text}</p>
                <p className="card-text text-muted" style={{ fontSize: '0.8rem' }}>
                  Created at: {note.createdAt}
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-secondary btn-sm" onClick={() => editNote(index)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteNote(index)}>
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
