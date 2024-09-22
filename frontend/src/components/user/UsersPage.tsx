import React, { useState, useEffect } from "react";
import api from "../../api";

interface User {
    user_id: number;
    login: string;
    name: string;
    surname: string;
    role: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/users")
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Błąd podczas pobierania użytkowników:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Ładowanie...</p>;
    }

    return (
        <div>
            <h1>Lista użytkowników</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.user_id}>
                        {user.name} {user.surname} ({user.login}) - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersPage;
