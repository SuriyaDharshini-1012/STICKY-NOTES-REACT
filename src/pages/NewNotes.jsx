import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AllNotes from '../pages/AllNotes';
import { useCreateNoteMutation } from '../redux/Service/NotesApi';
import { Colour } from '../constant/index';

const StickyNote = () => {
  const [notes, setNotes] = useState([{ id: Date.now(), content: '', color: '#ffee8c', isMenuOpen: false }]);
  const [viewAllNotes, setViewAllNotes] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [createNote] = useCreateNoteMutation();
  const [noteSaved, setNoteSaved] = useState(false);
  const [message, setMessage] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNotes(notes.map(note => ({ ...note, isMenuOpen: false })));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notes]);

  const addNote = () => {
    setNotes([...notes, { id: Date.now(), content: '', color: '#ffee8c', isMenuOpen: false }]);
  };

  const handleContentChange = (id, newContent) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, content: newContent } : note)));
  };

  const closeNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);

    if (updatedNotes.length === 0) {
      setViewAllNotes(true);  
    } else {
      setAllNotes(updatedNotes); 
    }
  };

  const chooseColor = (id, color) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, color } : note)));
  };

  const toggleMenu = (id) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, isMenuOpen: !note.isMenuOpen } : note)));
  };

  const handleAllNotes = () => {
    setViewAllNotes(true);
    setAllNotes(notes);
    setNotes(notes.map(note => ({ ...note, isMenuOpen: false })));
  };

  const saveNotes = async () => {
    for (const note of notes) {
      if (note.content.trim()) {
        try {
          await createNote({ content: note.content, colour: note.color });
        } catch (error) {
          console.error("Error creating notes:", error);
        }
      }
    }
    setNoteSaved(true);
    setTimeout(() => {
      setNoteSaved(false);
    }, 2000);
  };

  const option = (noteId) => (
    <div
      ref={menuRef}
      className="position-absolute w-100 bg-white border-1 rounded-1 p-2 shadow"
      style={{ zIndex: 100, top: '40px', right: '0' }}
    >
      <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={handleAllNotes}>
        <i className="bi bi-list" style={{ fontSize: '1.5rem', marginRight: '8px' }}></i>
        <span>Notes List</span>
      </div>
    </div>
  );

  const handleCloseAllNotes = () => {
    setViewAllNotes(false); 
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#COCOCO' }}>
      {viewAllNotes ? (
        <AllNotes notes={allNotes} closeView={handleCloseAllNotes} />
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {notes.map(note => (
            <div key={note.id} className="d-flex flex-column align-items-center">
              {noteSaved && (
                <div
                  style={{
                    fontSize: '1rem',
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '8px 16px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Note saved successfully!
                </div>
              )}
              {message && (
                <div
                  style={{
                    fontSize: '1rem',
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '8px 16px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {message}
                </div>
              )}

              <main className="border border-light card-body rounded p-0 m-2" style={{ backgroundColor: note.color, width: '300px', position: 'relative' }}>
                <header className="text-dark py-1 d-flex justify-content-between align-items-center" style={{ fontSize: '0.9rem' }}>
                  <i
                    className="bi bi-plus"
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                    onClick={addNote}
                    title="New Note"
                  ></i>
                  <div className="d-flex">
                    <i
                      className="bi bi-check"
                      style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                      title="Save Notes"
                      onClick={saveNotes}
                    ></i>
                    <i
                      className="bi bi-three-dots"
                      style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                      onClick={() => toggleMenu(note.id)}
                      title="Menu"
                    ></i>
                    <i
                      className="bi bi-x ms-2"
                      style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                      onClick={() => closeNote(note.id)}  
                      title="Close Notes"
                    ></i>
                  </div>
                </header>

                {note.isMenuOpen && option(note.id)}

                <textarea
                  className="form-control rounded-0"
                  rows="10"
                  placeholder="Take a Note..."
                  value={note.content}
                  onChange={(e) => handleContentChange(note.id, e.target.value)}
                  style={{ backgroundColor: note.color }}
                ></textarea>

                <footer className="text-center mb-0 border-top" style={{ padding: 0 }}>
                  <div className="color-options d-flex" style={{ margin: 0 }}>
                    {Colour.map(color => (
                      <div
                        key={color}
                        className="color-option"
                        style={{
                          backgroundColor: color,
                          width: '50px',
                          height: '30px',
                          cursor: 'pointer',
                        }}
                        onClick={() => chooseColor(note.id, color)}
                      ></div>
                    ))}
                  </div>
                </footer>
              </main>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StickyNote;
