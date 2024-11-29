"use client";

import { createContext, useContext, useState } from "react";

// Vytvoření kontextu
const AuthContext = createContext();

// Poskytovatel kontextu
export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
            {children}
        </AuthContext.Provider>
    );
}

// Vlastní hook pro snadnější přístup ke kontextu
export function useAuth() {
    return useContext(AuthContext);
}
