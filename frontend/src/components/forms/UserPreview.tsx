import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const UserPreview: React.FC = () => {
    const navigate = useNavigate();

    const { id: userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(
                    `${ServerPaths.USERS}/${userId}`
                );
                setUser(response.data);
            } catch (err) {
                setError(ClientMessages.USERS_PREVIEW_ERROR + err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    if (loading) return <p>Ładowanie danych użytkownika...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <button onClick={() => navigate(RoutesPaths.USERS)}>
                Wróć do listy użytkowników
            </button>
            <h1>Dane użytkownika</h1>
            <p>Nazwa: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Rola: {user.role}</p>
        </div>
    );
};

export default UserPreview;
