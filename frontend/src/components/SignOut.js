import React, { useState } from 'react';
const SignOut = ({ handle }) => {
    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/sign-out', {
                credentials: 'include',
                method: 'POST',
            });
            const body = await response.text();
            console.log(body);
        } catch (error) {
            console.error('Error:', error);
        }
        handle();
    };
    return (
        <button onClick={handleSignOut}>Sign Out</button>
    );
};
export default SignOut;