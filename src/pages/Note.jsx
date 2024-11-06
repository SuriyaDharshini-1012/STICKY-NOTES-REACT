import React, { useState } from 'react';
import { useCreateNoteMutation, useDeleteNoteMutation } from '../redux/Service/NotesApi';

const colors = ['LightBlue', 'Maroon', 'Violet', 'Deep Emerald Green', 'LightCoral'];

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('LightBlue');
  const [isPinned, setIsPinned] = useState(false);
  const [createNote] = useCreateNoteMutation();
  const [deleteNoteApi] = useDeleteNoteMutation(); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Add a new note
  const addNote = async () => {
    if (!noteText || !noteTitle) {
      setMessage('Title and content must not be empty.');
      return;
    }

    const newNote = {
      title: noteTitle,
      content: noteText,
      colour: selectedColor,
      isPinned,
    };

    setLoading(true);

    try {
      const createdNote = await createNote(newNote).unwrap();
      setNotes((prevNotes) => [...prevNotes, createdNote]);
      setMessage('Note created successfully!');
      console.log(createdNote);
    } catch (error) {
      console.error('Failed to create note:', error);
      setMessage('Failed to create note. Please try again.');
    } finally {
      setLoading(false);
      resetForm();
    }
  };

 
  const deleteNote = async (id) => {
    console.log(id);
    try {
      
      setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));

     
      await deleteNoteApi(id).unwrap();

      setMessage('Note deleted successfully!');
    } catch (error) {
      console.error('Failed to delete note:', error);


      setNotes((prevNotes) => [...prevNotes]);

      setMessage('Failed to delete note. Please try again.');
    }
  };

 
  const resetForm = () => {
    setNoteText('');
    setNoteTitle('');
    setSelectedColor('LightBlue');
    setIsPinned(false);
  };

  return (
    <div className="bg-image p-3 rounded">
      <h1 className="text-center">Let's Start</h1>
      {message && <div className="alert alert-info">{message}</div>}

     
      <div className="card mb-4" style={{ maxWidth: '400px', margin: 'auto' }}>
        <div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
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
          <div className="mb-3">
            <label>
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
              />
              Pin Note
            </label>
          </div>
          <button className="btn btn-primary btn-sm" onClick={addNote} disabled={loading}>
            {loading ? 'Adding...' : 'Add Note'}
          </button>
        </div>
      </div>

      {/* Display list of notes */}
      <div className="notes-container mt-4">
        <h2>Notes</h2>
        {notes.length === 0 && <p>No notes available.</p>}
        <div className="row">
          {notes.map((note) => (
            <div key={note.id} className="col-12 col-md-4 mb-3">
              <div
                className="card"
                style={{
                  backgroundColor: note.colour,
                  borderRadius: '10px',
                  padding: '15px',
                  minHeight: '200px',
                }}
              >
                <h5>{note.title}</h5>
                <p>{note.content}</p>
                <div className="d-flex justify-content-between">
                  <span>{note.isPinned ? 'Pinned' : ''}</span>
                  <span>Created at: {note.createdAt || 'N/A'}</span>
                </div>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => deleteNote(note.id)} // Pass note.id to delete
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Note;
