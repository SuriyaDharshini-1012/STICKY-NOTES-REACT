import React from 'react';


const Note = () => {
    return (
        <div className="bg-image d-flex">
            <h1 className="text-center mb-4">Create Your Sticky Notes</h1>
            <form className="bg-light p-4 rounded shadow" style={{ width: '400px' }}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Content"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Note</button>
            </form>
        </div>
    );
};

export default Note;