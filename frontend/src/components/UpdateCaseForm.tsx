import React, { useState, useEffect } from "react";
import api from "../api";

interface Props {
    caseId: number;
}

const UpdateCaseForm: React.FC<Props> = ({ caseId }) => {
    const [caseData, setCaseData] = useState({
        case_identifier: "",
        case_type: "",
        case_description: "",
    });

    useEffect(() => {
        api.get(`/cases/${caseId}`)
            .then((response) => setCaseData(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania sprawy:", error)
            );
    }, [caseId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/cases/${caseId}`, caseData);
            alert("Sprawa została zaktualizowana");
        } catch (error) {
            console.error("Błąd podczas aktualizacji sprawy:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Identyfikator sprawy:</label>
                <input
                    type="text"
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
            <div>
                <label>Typ sprawy:</label>
                <input
                    type="text"
                    value={caseData.case_type}
                    onChange={(e) =>
                        setCaseData({ ...caseData, case_type: e.target.value })
                    }
                    required
                />
            </div>
            <div>
                <label>Opis sprawy:</label>
                <input
                    type="text"
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
            <button type="submit">Zaktualizuj sprawę</button>
        </form>
    );
};

export default UpdateCaseForm;
