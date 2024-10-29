import React from 'react';
import Login from './Login';

const RedirectPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Please log in first</h1>
            <Login />
        </div>
    );
};

export default RedirectPage;
