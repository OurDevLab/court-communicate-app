import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const AddCourtForm: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [seat, setSeat] = useState("");
    const [courtType, setCourtType] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(ServerPaths.COURTS, {
                name,
                seat,
                court_type: courtType,
            });
            alert(ClientMessages.CASE_ADDING_SUCCESS);
            navigate(RoutesPaths.COURTS);
        } catch (error) {
            console.error(ClientMessages.CASE_ADDING_ERROR, error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Dodaj sąd</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nazwa sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Siedziba sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={seat}
                        onChange={(e) => setSeat(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Typ sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={courtType}
                        onChange={(e) => setCourtType(e.target.value)}
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Dodaj sąd
                    </button>
                    <button
                        onClick={() => navigate(RoutesPaths.COURTS)}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCourtForm;
