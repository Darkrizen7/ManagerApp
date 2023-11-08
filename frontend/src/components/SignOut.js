import React from 'react';
const SignOut = ({ handle }) => {
    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:3000/sign-out', {
                credentials: 'include',
                method: 'POST',
            });
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