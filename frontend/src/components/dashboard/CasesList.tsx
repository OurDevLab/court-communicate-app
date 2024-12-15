import { useEffect, useState } from "react";
import { isArray } from "lodash";
import { useNavigate } from "react-router-dom";

import { Navigation } from ".";
import api from "../../api";

const CasesList: React.FC = () => {
    const navigate = useNavigate();

    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCases = async () => {
        try {
            setLoading(true);
            const response = await api.get("/cases");
            setCases(response.data);
        } catch (err) {
            setError("Błąd podczas pobierania spraw:" + err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCase = async (caseId: number) => {
        if (window.confirm("Czy na pewno chcesz usunąć tę sprawę?")) {
            await api
                .delete(`/cases/${caseId}`)
                .then(() => {
                    setCases((prevCases) =>
                        prevCases.filter((caseItem) => caseItem.id !== caseId)
                    );
                    alert("Sprawa została usunięta");
                })
                .catch((error) =>
                    console.error("Błąd podczas usuwania sprawy:", error)
                );
        }
    };

    useEffect(() => {
        fetchCases();
    }, []);

    if (loading) return <p>Wczytywanie wykazu spraw...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="container">
            <Navigation />
            <h1 className="header">Wykaz spraw</h1>
            <button
                className="add-button"
                onClick={() => navigate("/cases/add")}
            >
                Dodaj sprawę
            </button>
            <ul className="list">
                {(!isArray(cases) || !cases.length) && (
                    <p>Brak spraw w systemie</p>
                )}
                {isArray(cases) &&
                    cases.map((caseItem) => (
                        <li key={caseItem.case_id} className="list-item">
                            <div>
                                <strong>{caseItem.case_identifier}</strong> -{" "}
                                {caseItem.case_description}
                            </div>
                            <div className="actions">
                                <button
                                    className="view-button"
                                    onClick={() =>
                                        navigate(`cases/preview/${caseItem.case_id}`)
                                    }
                                >
                                    Zobacz
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        navigate(`/cases/edit/${caseItem.case_id}`)
                                    }
                                >
                                    Edytuj
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteCase(caseItem.case_id)}
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

export default CasesList;
