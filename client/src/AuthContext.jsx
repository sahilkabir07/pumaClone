import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("userEmail");
        if (token && email) {
            setUser({ token, email });
        }
    }, []);

    const login = (token, email) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        setUser({ token, email });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
