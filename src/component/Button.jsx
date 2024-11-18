import React from 'react';

const Button = ({ className, id, type, onSubmit, handleSubmit }) => {
    return (
        <button 
            className={className} 
            id={id} 
            type={type} 
            onClick={handleSubmit}>
            {onSubmit}
        </button>
    );
};

export default Button;
