import React, { useState } from 'react';
import { useCreateNoteMutation } from '../redux/Service/NotesApi';  

const colors = ['LightBlue', 'Maroon', 'Violet', 'Deep Emerald Green', 'LightCoral'];

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('LightBlue');
  const [isPinned, setIsPinned] = useState(false);
  const [createNote] = useCreateNoteMutation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  
  const addNote = async () => {
    if (!noteText || !noteTitle) {
      setMessage("Title and content must not be empty.");
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
      setMessage("Note created successfully!");
    } catch (error) {
      console.error("Failed to create note:", error);
      
     
      if (error?.data?.message) {
        setMessage(error.data.message); 
      } else {
        setMessage("Failed to create note. Please try again.");
      }
    } finally {
      setLoading(false);
      resetForm();
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

      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1030 }}>
        {notes.map((note, index) => (
          <div className="mb-2" style={{ backgroundColor: note.colour, minWidth: '250px' }} key={index}>
            <div style={{ padding: '10px' }}>
              <h5>{note.title}</h5>
              <p style={{ fontSize: '0.9rem' }}>{note.content}</p>
              <p className="text-muted" style={{ fontSize: '0.8rem' }}>
                Created at: {new Date(note.createdAt).toLocaleString()}
              </p>
              <p className="card-text" style={{ fontSize: '0.8rem' }}>
                {note.isPinned ? 'Pinned' : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
