import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDeleteNoteMutation, useCreateNoteMutation, useUpdateNoteMutation, useGetNotesByUserIdQuery } from '../redux/Service/NotesApi';
import { Colour } from '../constant';
import DeleteModal from '../component/DeleteModal';
import { useNavigate } from 'react-router-dom';

const AllNotes = () => {
  const [stickyNotes, setStickyNotes] = useState([]);
  const [deleteNote] = useDeleteNoteMutation();
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openNotes, setOpenNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const getUserIdFromToken = (token) => {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.UserId;
  };
  
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');
  const userId = token ? getUserIdFromToken(token) : null;
  
  const { data: fetchedNotes, error, isLoading, refetch } = useGetNotesByUserIdQuery(userId);

  useEffect(() => {
    if (fetchedNotes) {
      setStickyNotes(fetchedNotes.data || []);
    }
  }, [fetchedNotes]);

  const addNote = () => {
    setOpenNotes([
      ...openNotes,
      { id: Date.now(), content: '', colour: '#ffee8c', isNew: true },
    ]);
  };

  const handleNoteClick = (note) => {
    if (!openNotes.find((openNote) => openNote.id === note.id)) {
      setOpenNotes([...openNotes, { ...note, isNew: false }]);
    }
  };

  const handleOpenDeleteModal = (noteId) => {
    setSelectedNote(noteId);
    setShowDeleteModal(true);
  };

  const handleDeleteNote = async () => {
    if (selectedNote) {
      try {
        await deleteNote(selectedNote).unwrap();
        refetch();
        setShowDeleteModal(false);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleSaveNote = async (note) => {
    if (note.isNew) {
      try {
        const newNote = { content: note.content, colour: note.colour };
        await createNote(newNote).unwrap();
      } catch (error) {
        console.error('Error creating note:', error);
      }
    } else {
      try {
        const updatedNote = { id: note.id, content: note.content, colour: note.colour };
        await updateNote(updatedNote).unwrap();
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
    refetch();
    setOpenNotes(openNotes.filter((openNote) => openNote.id !== note.id));
  };
  const handleCloseForm = (noteId) => {
    setOpenNotes(openNotes.filter((openNote) => openNote.id !== noteId));
  };

  const logout = () => {
    localStorage.removeItem('Token');
    navigate('/');
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching notes: {error.message}</div>;
  }

  return (
    <div className="container d-flex min-vh-100 flex-column flex-md-row fixed" style={{ overflow: 'hidden', height: '100vh' }}>
      <div className="card bg-transparent border-1 w-25 w-md-25" style={{ height: '600px' }}>
        <header className="text-dark d-flex justify-content-between align-items-center" style={{ fontSize: '0.9rem' }}>
          <i
            className="bi bi-plus"
            style={{ fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={addNote}
            title="New Notes"
          ></i>
          <div className="d-flex">
            <i
              className="bi bi-box-arrow-right"
              style={{ fontSize: '1.5rem', cursor: 'pointer' }}
              onClick={logout}
              title="Logout"
            ></i>
          </div>
        </header>

        <div className="card-body" style={{ padding: '10px', overflowY: 'auto', overflowX: 'hidden', maxHeight: 'calc(100vh - 120px)' }}>
          <h3 className="text-start fw-bold mb-3">Sticky Notes</h3>
          {stickyNotes.length > 0 ? (
            stickyNotes.map((note) => (
              <div
                key={note.id}
                className="card w-100 mb-2"
                style={{
                  backgroundColor: note.colour || '#fff',
                  cursor: 'pointer',
                  marginLeft: '-10px',
                }}
                onClick={() => handleNoteClick(note)}
              >
                <div className="d-flex justify-content-between p-2">
                  <p className="mb-0">{note.content}</p>
                  <i
                    className="bi bi-trash"
                    style={{ fontSize: '1.5rem', cursor: 'pointer', color: 'red' }}
                    title="Delete Notes"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteModal(note.id);
                    }}
                  ></i>
                </div>
              </div>
            ))
          ) : (
            <p>No notes available.</p>
          )}
        </div>
      </div>

      <div className="flex-column flex-md-row">
        {openNotes.map((note) => (
          <div key={note.id}>
            <div className="">
              <header className="border-0 text-dark py-1 d-flex justify-content-end align-items-center" style={{ fontSize: '0.9rem', backgroundColor: note.colour }}>
                <div className="d-flex justify-content-end">
                  <i
                    className="bi bi-check"
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                    title="Save Notes"
                    onClick={() => handleSaveNote(note)}
                  ></i>
                  <i
                    className="bi bi-x ms-2"
                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}
                    onClick={() => handleCloseForm(note.id)}
                    title="Close Note"
                  ></i>
                </div>
              </header>

              <div className="" style={{ position: 'relative' }}>
                <textarea
                  className="form-control"
                  rows="10"
                  placeholder="Take a Note..."
                  value={note.content}
                  onChange={(e) => {
                    setOpenNotes(openNotes.map((openNote) => openNote.id === note.id ? { ...openNote, content: e.target.value } : openNote));
                  }}
                  style={{ backgroundColor: note.colour, borderRadius: '0px' }}
                ></textarea>

                <div className="text-center" style={{ padding: 0 }}>
                  <div className="d-flex" style={{ padding: 0, margin: 0 }}>
                    {Colour.map((color) => (
                      <div
                        key={color}
                        className="color-option"
                        style={{
                          backgroundColor: color,
                          width: '30px',
                          height: '20px',
                          cursor: 'pointer',
                          display: 'column',
                        }}
                        onClick={() => {
                          setOpenNotes(openNotes.map((openNote) => openNote.id === note.id ? { ...openNote, colour: color } : openNote));
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default AllNotes;
