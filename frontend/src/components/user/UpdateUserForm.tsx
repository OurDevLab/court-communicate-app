import React, { useState, useEffect } from "react";
import api from "../../api";

interface Props {
    userId: number;
}

const UpdateUserForm: React.FC<Props> = ({ userId }) => {
    const [user, setUser] = useState({
        login: "",
        name: "",
        surname: "",
        role: "CITIZEN",
    });

    useEffect(() => {
        api.get(`/users/${userId}`)
            .then((response) => setUser(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania użytkownika:", error)
            );
    }, [userId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        api.put(`/users/${userId}`, user)
            .then(() => alert("Użytkownik został zaktualizowany"))
            .catch((error) =>
                console.error("Błąd podczas aktualizacji użytkownika:", error)
            );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Imię: </label>
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
            </div>
            <div>
                <label>Nazwisko: </label>
                <input
                    type="text"
                    value={user.surname}
                    onChange={(e) =>
                        setUser({ ...user, surname: e.target.value })
                    }
                />
            </div>
            <div>
                <label>Rola: </label>
                <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                    <option value="CITIZEN">Citizen</option>
                    <option value="CLERK">Clerk</option>
                    <option value="JUDGE">Judge</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            <button type="submit">Zaktualizuj</button>
        </form>
    );
};

export default UpdateUserForm;
