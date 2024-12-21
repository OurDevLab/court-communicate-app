import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const UpdateDepartmentForm: React.FC = () => {
    const navigate = useNavigate();
    const { id: departmentId } = useParams();

    const [department, setDepartment] = useState({ name: "", court_id: -1 });

    useEffect(() => {
        api.get(`${ServerPaths.DEPARTMENTS}/${departmentId}`)
            .then((response) => setDepartment(response.data))
            .catch((error) =>
                console.error(ClientMessages.DEPARTMENT_EDITING_ERROR, error)
            );
    }, [departmentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (department.court_id !== -1 && department.name)
                await api.put(`${ServerPaths.DEPARTMENTS}/${departmentId}`, {
                    name: department.name,
                    court_id: department.court_id,
                });
            alert(ClientMessages.DEPARTMENT_EDITING_SUCCESS);
        } catch (error) {
            console.error(ClientMessages.DEPARTMENT_EDITING_ERROR, error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Edytuj departament</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nazwa departamentu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={department.name}
                        onChange={(e) =>
                            setDepartment({
                                ...department,
                                name: e.target.value,
                            })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ID sądu:</label>
                    <input
                        type="number"
                        className="form-input"
                        value={department.court_id || ""}
                        onChange={(e) =>
                            setDepartment({
                                ...department,
                                court_id: Number(e.target.value),
                            })
                        }
                        required
                    />
                </div>
                <button type="submit">Zaktualizuj departament</button>

                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Zaktualizuj departament
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

export default UpdateDepartmentForm;
