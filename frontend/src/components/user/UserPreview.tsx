import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserPreview: React.FC = () => {
    const { id: userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${userId}`);
                setUser(response.data);
            } catch (err) {
                setError(
                    "Wystąpił błąd podczas pobierania danych użytkownika" + err
                );
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
            <h1>Dane użytkownika</h1>
            <p>Nazwa: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Rola: {user.role}</p>
        </div>
    );
};

export default UserPreview;
