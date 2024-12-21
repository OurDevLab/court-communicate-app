import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const UpdateCaseForm: React.FC = () => {
    const navigate = useNavigate();
    const { id: caseId } = useParams();

    const [caseData, setCaseData] = useState({
        case_identifier: "",
        case_type: "",
        case_description: "",
    });

    useEffect(() => {
        api.get(`${ServerPaths.CASES}/${caseId}`)
            .then((response) => setCaseData(response.data))
            .catch((error) =>
                console.error(ClientMessages.CASE_EDITING_ERROR, error)
            );
    }, [caseId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`${ServerPaths.CASES}/${caseId}`, caseData);
            alert(ClientMessages.CASE_EDITING_SUCCESS);
        } catch (error) {
            console.error(ClientMessages.CASE_EDITING_ERROR, error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Edytuj sprawę</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Sygnatura sprawy:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={caseData.case_identifier}
                        onChange={(e) =>
                            setCaseData({
                                ...caseData,
                                case_identifier: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Typ sprawy:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={caseData.case_type}
                        onChange={(e) =>
                            setCaseData({
                                ...caseData,
                                case_type: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Opis sprawy:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={caseData.case_description}
                        onChange={(e) =>
                            setCaseData({
                                ...caseData,
                                case_description: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Zaktualizuj sprawę
                    </button>
                    <button
                        onClick={() => navigate(RoutesPaths.CASES)}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCaseForm;
