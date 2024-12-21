import React, { useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const { COURTS, DEPARTMENTS, DASHBOARD } = RoutesPaths;

const AddDepartmentForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [courtId, setCourtId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(ServerPaths.DEPARTMENTS, {
                name,
                court_id: Number(id) || courtId,
            });
            alert(ClientMessages.DEPARTMENT_ADDING_SUCCESS);
            navigate(id ? `${COURTS}/${id}${DEPARTMENTS}` : DASHBOARD);
        } catch (error) {
            console.error(ClientMessages.DEPARTMENT_ADDING_ERROR, error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Dodaj departament</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nazwa departamentu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Sąd:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={courtId || ""}
                        onChange={(e) => setCourtId(Number(e.target.value))}
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Dodaj departament
                    </button>
                    <button
                        onClick={() =>
                            id
                                ? navigate(`${COURTS}/${id}${DEPARTMENTS}`)
                                : navigate(DASHBOARD)
                        }
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDepartmentForm;
