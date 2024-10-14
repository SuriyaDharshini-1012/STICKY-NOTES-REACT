import React, { useState } from 'react';
import NoteForm from '../component/NoteForm';
import NotesList from '../component/NoteList';

const Home = () => {
    const [notes, setNotes] = useState([]);

    const addNote = (note) => {
        setNotes([...notes, note]);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div>
            <h1>Sticky Notes</h1>
            <NoteForm onAdd={addNote} />
            <NotesList notes={notes} onDelete={deleteNote} />
        </div>
    );
};

export default Home;
