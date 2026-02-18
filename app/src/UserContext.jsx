import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        // Persist across page refresh via localStorage
        try {
            const stored = localStorage.getItem("paleopath_user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const saveUser = (userData) => {
        setUser(userData);
        if (userData) {
            localStorage.setItem("paleopath_user", JSON.stringify(userData));
        } else {
            localStorage.removeItem("paleopath_user");
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser: saveUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
