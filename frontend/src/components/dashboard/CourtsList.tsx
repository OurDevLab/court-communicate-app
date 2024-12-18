import { useEffect, useState } from "react";
import { isArray } from "lodash";
import { useNavigate } from "react-router-dom";

import { Navigation } from ".";
import api from "../../api";

const CourtsList: React.FC = () => {
    const navigate = useNavigate();

    const [courts, setCourts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourts = async () => {
        try {
            setLoading(true);
            const response = await api.get("/courts");
            setCourts(response.data);
        } catch (err) {
            setError("Błąd podczas pobierania sądów:" + err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCourt = async (courtId: number) => {
        if (window.confirm("Czy na pewno chcesz usunąć ten sąd?")) {
            await api
                .delete(`/courts/${courtId}`)
                .then(() => {
                    setCourts((prevCourts) =>
                        prevCourts.filter((court) => court.id !== courtId)
                    );
                    alert("Sąd został usunięty.");
                })
                .catch((error) =>
                    console.error("Błąd podczas usuwania sądu:", error)
                );
        }
    };

    useEffect(() => {
        fetchCourts();
    }, []);

    if (loading) return <p>Wczytywanie listy sądów...</p>;
    if (error) return <p className="error-message">{error}</p>;
    return (
        <div className="container">
            <Navigation />
            <h1 className="header">Lista sądów</h1>
            <button
                className="add-button"
                onClick={() => navigate("/courts/add")}
            >
                Dodaj sąd
            </button>
            <ul className="list">
                {(!isArray(courts) || !courts.length) && (
                    <p>Brak sądów w systemie</p>
                )}
                {isArray(courts) &&
                    courts.map((court) => (
                        <li key={court.id} className="list-item">
                            <div>
                                <strong>{court.name}</strong>
                            </div>
                            <div className="actions">
                                <button
                                    className="view-button"
                                    onClick={() =>
                                        navigate(`/courts/preview/${court.id}`)
                                    }
                                >
                                    Zobacz
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        navigate(`/courts/edit/${court.id}`)
                                    }
                                >
                                    Edytuj
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteCourt(court.id)}
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

export default CourtsList;
