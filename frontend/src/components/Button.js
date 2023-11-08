import React from 'react';

const Button = ({ onClick, text }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onClick();
    };
    return (
        <button onClick={handleSubmit}>Sign Out</button>
    );
}
export default Button;
