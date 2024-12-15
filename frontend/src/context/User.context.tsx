import { createContext, useEffect, useState, ReactNode } from "react";
import api from "../api";

interface UserContextType {
    username: string | null;
    setUsername: (username: string | null) => void;
    id: number | null;
    setId: (id: number | null) => void;
}

export const UserContext = createContext<UserContextType>({
    username: null,
    setUsername: () => {},
    id: null,
    setId: () => {},
});

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [username, setUsername] = useState<string | null>(null);
    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        api.get("/profile").then((response) => {
            setId(response.data.userId);
            setUsername(response.data.username);
        });
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/profile");
                setId(response.data.userId);
                setUsername(response.data.username);
            } catch (error) {
                console.error("Błąd walidacji tokena:", error);
                setId(null);
                setUsername(null);
                localStorage.removeItem("token");
            }
        };
    
        fetchProfile();
    }, []);

    return (
        <UserContext.Provider value={{ username, setUsername, id, setId }}>
            {children}
        </UserContext.Provider>
    );
}
