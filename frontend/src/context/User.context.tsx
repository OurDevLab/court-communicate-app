import { createContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);

                console.log(decoded);

                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTime) {
                    throw new Error("Token expired");
                }

                setId(decoded.id);
                setUsername(decoded.username);
            } catch (error) {
                console.error("Token validation error:", error);
                setId(null);
                setUsername(null);
                localStorage.removeItem("token");
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ username, setUsername, id, setId }}>
            {children}
        </UserContext.Provider>
    );
}
