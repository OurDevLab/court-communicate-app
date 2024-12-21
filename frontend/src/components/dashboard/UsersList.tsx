import { useEffect, useState } from "react";
import { isArray } from "lodash";
import { useNavigate } from "react-router-dom";

import { Navigation } from ".";
import api from "../../api";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const { USERS, ADD, EDIT, PREVIEW } = RoutesPaths;
const {
    ERROR_FETCHING_USERS,
    CONFIRM_USER_DELETION,
    USER_DELETION_SUCCESS,
    USER_DELETION_ERROR,
} = ClientMessages;

const UsersList: React.FC = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get(ServerPaths.USERS);
            setUsers(response.data);
        } catch (err) {
            setError(ERROR_FETCHING_USERS + err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId: number) => {
        if (window.confirm(CONFIRM_USER_DELETION)) {
            await api
                .delete(`${USERS}/${userId}`)
                .then(() => {
                    setUsers((prevUsers) =>
                        prevUsers.filter((user) => user.id !== userId)
                    );
                    alert(USER_DELETION_SUCCESS);
                })
                .catch((error) => console.error(USER_DELETION_ERROR, error));
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
                onClick={() => navigate(`${USERS}${ADD}`)}
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
                                        navigate(
                                            `${USERS}${PREVIEW}/${user.id}`
                                        )
                                    }
                                >
                                    Zobacz
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        navigate(`${USERS}${EDIT}/${user.id}`)
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
