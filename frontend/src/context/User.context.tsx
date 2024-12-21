import { createContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

import { ConfigVariables, ClientMessages } from "../config";

const { tokenKey, storageEvent } = ConfigVariables;
const { TOKEN_EXPIRED, TOKEN_VALIDATION_ERROR } = ClientMessages;

interface DecodedToken {
    id: number;
    username: string;
    role: string;
    exp: number;
}

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

    const loadUserFromToken = () => {
        const token = localStorage.getItem(tokenKey);
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTime) {
                    throw new Error(TOKEN_EXPIRED);
                }
                setId(decoded.id);
                setUsername(decoded.username);
            } catch (error) {
                console.error(TOKEN_VALIDATION_ERROR, error);
                setId(null);
                setUsername(null);
                localStorage.removeItem(tokenKey);
            }
        } else {
            setId(null);
            setUsername(null);
        }
    };

    useEffect(() => {
        loadUserFromToken();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === tokenKey) {
                loadUserFromToken();
            }
        };
        window.addEventListener(storageEvent, handleStorageChange);

        return () => {
            window.removeEventListener(storageEvent, handleStorageChange);
        };
    }, []);

    return (
        <UserContext.Provider value={{ username, setUsername, id, setId }}>
            {children}
        </UserContext.Provider>
    );
}
