import React, { useState } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";

const AddDepartmentForm: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [courtId, setCourtId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/departments", {
                name,
                court_id: Number(id) || courtId,
            });
            alert("Departament został dodany");
            navigate(id
                ? `/courts/${id}/departments`
                : "/"
            );
        } catch (error) {
            console.error("Błąd podczas dodawania departamentu:", error);
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
                                ? navigate(`/courts/${id}/departments`)
                                : navigate("/")
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
