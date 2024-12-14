import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const AddCaseForm: React.FC = () => {
    const navigate = useNavigate();

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
        <div className="form-wrapper">
            <h1>Dodaj sprawę</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Sygnatura sprawy:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={caseIdentifier}
                        onChange={(e) => setCaseIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Typ sprawy:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={caseType}
                        onChange={(e) => setCaseType(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Opis sprawy:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={caseDescription}
                        onChange={(e) => setCaseDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Dodaj sprawę
                    </button>
                    <button
                        onClick={() => navigate("/cases")}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCaseForm;
