import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('Token'); 
        console.log("Stored Token:", token); // Log the token for debugging
        if (token) {
            try {
                // Decode the token and extract the payload
                const payload = JSON.parse(atob(token.split('.')[1])); 
                console.log("Decoded Payload:", payload); // Log the decoded payload for debugging
                if (payload.UserId) {
                    setUserId(payload.UserId); // Set the userId if available
                } else {
                    console.error("UserId not found in token payload.");
                }
            } catch (error) {
                console.error("Token decoding failed:", error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
