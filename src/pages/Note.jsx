import React, { useState } from 'react';
import { useCreateNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation, useGetNotesQuery } from '../redux/Service/NotesApi';

const colors = ['LightBlue', 'Maroon', 'Violet', 'Deep Emerald Green', 'LightCoral'];

const Note = () => {
  const [noteText, setNoteText] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('LightBlue');
  const [isPinned, setIsPinned] = useState(false);
  const [message, setMessage] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [isCreatingNote, setIsCreatingNote] = useState(false); 
  const { data: notes = [], error, isLoading: isFetchingNotes, refetch } = useGetNotesQuery();
  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
  const [deleteNoteApi, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const [updateNoteApi, { isLoading: isUpdating }] = useUpdateNoteMutation();

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

    try {
      await createNote(newNote).unwrap();
      setMessage('Note created successfully!');
    } catch (error) {
      console.error('Failed to create note:', error);
      setMessage('Failed to create note. Please try again.');
    } finally {
      resetForm();
      setIsCreatingNote(false); 
    }
  };

  const updateNote = async () => {
    if (!noteText || !noteTitle) {
      setMessage('Title and content must not be empty.');
      return;
    }

    const updatedNote = {
      id: editingNote.id,
      title: noteTitle,
      content: noteText,
      colour: selectedColor,
      isPinned,
    };

    try {
      await updateNoteApi(updatedNote).unwrap();
      setMessage('Note updated successfully!');
      setEditingNote(null);
      refetch();
    } catch (error) {
      console.error('Failed to update note:', error);
      setMessage('Failed to update note. Please try again.');
    } finally {
      resetForm();
    }
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) return;

    try {
      await deleteNoteApi(id).unwrap();
      setMessage('Note deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Failed to delete note:', error);
      setMessage('Failed to delete note. Please try again.');
    }
  };

  const resetForm = () => {
    setNoteText('');
    setNoteTitle('');
    setSelectedColor('LightBlue');
    setIsPinned(false);
  };

  const startEditing = (note) => {
    setEditingNote(note);
    setNoteTitle(note.title);
    setNoteText(note.content);
    setSelectedColor(note.colour);
    setIsPinned(note.isPinned);
  };

  return (
    <div className=" p-3 rounded">
      <h1 className="text-center">Let's Start</h1>
      {message && <div className="alert alert-info">{message}</div>}

      
      {!isCreatingNote && (
        <div
          className="card mb-4"
          style={{
            maxWidth: '400px',
            margin: 'auto',
            backgroundColor: 'lightgrey',
            borderRadius: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            padding: '50px 0',
          }}
          onClick={() => setIsCreatingNote(true)} 
        >
          <h3>+</h3>
          <p>Click to add a note</p>
        </div>
      )}

      {isCreatingNote && (
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
            <span>
              <div className="d inline flex">
                <label>
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                  />
                  Pin Note
                </label>
              </div>
            </span>

            <div className="d-flex justify-content-between">
              {editingNote ? (
                <button
                  className="btn  btn-block text-white"
                  onClick={updateNote}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Note'}
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-block text-white"
                  onClick={addNote}
                  disabled={isCreating}
                >
                  {isCreating ? 'Adding...' : 'Add Note'}
                </button>
              )}

         
              <button
                className="btn btn-secondary btn-block text-white"
                onClick={() => {
                  resetForm();
                  setIsCreatingNote(false); 
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
      <div className="notes-container mt-4">
        {isFetchingNotes ? (
          <p>Loading notes...</p>
        ) : error ? (
          <p>Error fetching notes. Please try again.</p>
        ) : notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
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
                  <div className="d-flex justify-content-between mt-2">
                    <button className="btn bg-dark btn-block text-white" onClick={() => startEditing(note)}>
                      Edit
                    </button>
                    <button
                      className="btn bg-dark btn-block text-white"
                      onClick={() => deleteNote(note.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
