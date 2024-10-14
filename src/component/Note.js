import React from 'react';
import styled from 'styled-components';

const NoteContainer = styled.div`
    background-color: #f9ebae;
    border: 1px solid #f0c36d;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    width: 200px;
`;

const Note = ({ note, onDelete }) =>
     {
        // if (!note) {
        //     return <div>Note not found</div>;
        //   }
    return (
        <NoteContainer>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => onDelete(note.id)}>Delete</button>
        </NoteContainer>
    );
};

export default Note;
