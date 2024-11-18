import React from 'react';

const Input = ({ className, name, type, placeholder, id }) => {
  return (
    <div>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
      />
    </div>
  );
};

export default Input;
