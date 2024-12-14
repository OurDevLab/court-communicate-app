import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";

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
        axios.get("/profile").then((response) => {
            setId(response.data.userId);
            setUsername(response.data.username);
        });
    }, []);

    return (
        <UserContext.Provider value={{ username, setUsername, id, setId }}>
            {children}
        </UserContext.Provider>
    );
}