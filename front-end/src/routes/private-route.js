import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    //get token and user object from storage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    //if no token, clear local storage and logout
    if (!token || !user) {
        localStorage.clear();
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;