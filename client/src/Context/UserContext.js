import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Check if the 'userData' cookie exists
    const userDataCookie = Cookies.get('userData');
    const initialUserData = userDataCookie ? JSON.parse(userDataCookie) : null;

    // Use initialUserData as the initial state
    const [user, setUser] = useState(initialUserData);

    const logout = () => {
        Cookies.remove('userData');
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
