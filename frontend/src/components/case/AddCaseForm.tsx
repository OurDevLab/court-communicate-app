import React, { useState } from "react";
import api from "../../api";

const AddCaseForm: React.FC = () => {
    const [caseIdentifier, setCaseIdentifier] = useState("");
    const [caseType, setCaseType] = useState("");
    const [caseDescription, setCaseDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/cases", {
                case_identifier: caseIdentifier,
                case_type: caseType,
                case_description: caseDescription,
            });
            alert("Sprawa została dodana");
        } catch (error) {
            console.error("Błąd podczas dodawania sprawy:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Identyfikator sprawy:</label>
                <input
                    type="text"
                    value={caseIdentifier}
                    onChange={(e) => setCaseIdentifier(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Typ sprawy:</label>
                <input
                    type="text"
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Opis sprawy:</label>
                <input
                    type="text"
                    value={caseDescription}
                    onChange={(e) => setCaseDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Dodaj sprawę</button>
        </form>
    );
};

export default AddCaseForm;
