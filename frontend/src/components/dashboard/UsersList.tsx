import { useEffect, useState } from "react";
import { isArray } from "lodash";
import { useNavigate } from "react-router-dom";

import { Navigation } from ".";
import api from "../../api";

const UsersList: React.FC = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get("/users");
            setUsers(response.data);
        } catch (err) {
            setError("Błąd podczas pobierania użytkowników:" + err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: number) => {
        if (window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
            await api
                .delete(`/users/${userId}`)
                .then(() => {
                    setUsers((prevUsers) =>
                        prevUsers.filter((user) => user.id !== userId)
                    );
                    alert("Użytkownik został usunięty");
                })
                .catch((error) =>
                    console.error("Błąd podczas usuwania użytkownika:", error)
                );
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p>Wczytywanie listy użytkowników...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="container">
            <Navigation />
            <h1 className="header">Lista użytkowników</h1>
            <button
                className="add-button"
                onClick={() => navigate("/users/add")}
            >
                Dodaj użytkownika
            </button>
            <ul className="list">
                {(!isArray(users) || !users.length) && (
                    <p>Brak użytkowników w systemie</p>
                )}
                {isArray(users) &&
                    users.map((user) => (
                        <li key={user.id} className="list-item">
                            <div>
                                <strong>{user.name}</strong> - {user.email}
                            </div>
                            <div className="actions">
                                <button
                                    className="view-button"
                                    onClick={() =>
                                        navigate(`/users/preview/${user.id}`)
                                    }
                                >
                                    Zobacz
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        navigate(`/users/edit/${user.id}`)
                                    }
                                >
                                    Edytuj
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default UsersList;
