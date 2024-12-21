import { useEffect, useState } from "react";
import { isArray } from "lodash";
import { useNavigate } from "react-router-dom";

import { Navigation } from ".";
import api from "../../api";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const { COURTS, ADD, EDIT, PREVIEW } = RoutesPaths;
const {
    ERROR_FETCHING_COURTS,
    CONFIRM_COURT_DELETION,
    COURT_DELETION_SUCCESS,
    COURT_DELETION_ERROR,
} = ClientMessages;

const CourtsList: React.FC = () => {
    const navigate = useNavigate();

    const [courts, setCourts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCourts = async () => {
        try {
            setLoading(true);
            const response = await api.get(ServerPaths.COURTS);
            setCourts(response.data);
        } catch (err) {
            setError(ERROR_FETCHING_COURTS + err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCourt = async (courtId: number) => {
        if (window.confirm(CONFIRM_COURT_DELETION)) {
            await api
                .delete(`${ServerPaths.COURTS}/${courtId}`)
                .then(() => {
                    setCourts((prevCourts) =>
                        prevCourts.filter((court) => court.id !== courtId)
                    );
                    alert(COURT_DELETION_SUCCESS);
                })
                .catch((error) => console.error(COURT_DELETION_ERROR, error));
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
                onClick={() => navigate(`${COURTS}${ADD}`)}
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
                                        navigate(
                                            `${COURTS}${PREVIEW}/${court.id}`
                                        )
                                    }
                                >
                                    Zobacz
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        navigate(`${COURTS}${EDIT}/${court.id}`)
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
