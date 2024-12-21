import { useEffect, useState } from "react";
import { isArray } from "lodash";
import { useNavigate } from "react-router-dom";

import { Navigation } from ".";
import api from "../../api";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const { CASES, ADD, EDIT, PREVIEW } = RoutesPaths;
const {
    ERROR_FETCHING_CASES,
    CONFIRM_CASE_DELETION,
    CASE_DELETION_SUCCESS,
    CASE_DELETION_ERROR,
} = ClientMessages;

const CasesList: React.FC = () => {
    const navigate = useNavigate();

    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCases = async () => {
        try {
            setLoading(true);
            const response = await api.get(ServerPaths.CASES);
            setCases(response.data);
        } catch (err) {
            setError(ERROR_FETCHING_CASES + err);
        } finally {
            setLoading(false);
        }
    };

    const deleteCase = async (caseId: number) => {
        if (window.confirm(CONFIRM_CASE_DELETION)) {
            await api
                .delete(`${ServerPaths.CASES}/${caseId}`)
                .then(() => {
                    setCases((prevCases) =>
                        prevCases.filter((caseItem) => caseItem.id !== caseId)
                    );
                    alert(CASE_DELETION_SUCCESS);
                })
                .catch((error) => console.error(CASE_DELETION_ERROR, error));
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
                onClick={() => navigate(`${CASES}${ADD}`)}
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
                                        navigate(
                                            `${CASES}${PREVIEW}/${caseItem.case_id}`
                                        )
                                    }
                                >
                                    Zobacz
                                </button>
                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        navigate(
                                            `${CASES}${EDIT}/${caseItem.case_id}`
                                        )
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
