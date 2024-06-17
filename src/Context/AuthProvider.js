import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        customer: null,  // Add customer to the initial state
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const customer = {
            id: localStorage.getItem('customerId'),
            firstName: localStorage.getItem('firstName'),
            address: localStorage.getItem('address'),
        };

        if (token && customer.id) {
            setAuth({ token, customer }); 
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
