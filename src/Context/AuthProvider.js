import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null }); // Initialize with token as null
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({ token }); // Update auth state with the token
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
