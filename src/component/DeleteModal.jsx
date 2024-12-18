import React from 'react';

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteNote }) => {
  return (
    showDeleteModal && (
      <div className="modal modal-lg show" role="dialog" style={{ display: 'flex' }}>
        <div className="modal-dialog modal-dialog-centered" role="document" style={{ width: '20%', minHeight: '200px' }}>
          <div className="modal-content">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="modal-title">Confirm Deletion</h5>
              <i
                className="bi bi-x"
                style={{ fontSize: '1.5rem', pointer: 'cursor' }}
                onClick={() => setShowDeleteModal(false)}
                title="close"
              ></i>
            </div>
            <p className="modal-dialog-centered">Do you want to delete this note?</p>
            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-secondary btn-xs"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                onClick={() => setShowDeleteModal(false)}
              >
                Keep
              </button>
              <button
                type="button"
                className="btn btn-danger btn-xs"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                onClick={handleDeleteNote}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
