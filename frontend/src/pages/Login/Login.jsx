import React from 'react';
import {Navigate} from "react-router";

const Login = () => {

    const token = localStorage.getItem('accessToken');
    if (token) return <Navigate to="/" replace />;

    return (
        <div>
            Login
        </div>
    );
};

export default Login;