import React, { useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";

const AddDepartmentForm: React.FC = () => {
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
        } catch (error) {
            console.error("Błąd podczas dodawania departamentu:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nazwa departamentu:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Sąd:</label>
                <input
                    type="number"
                    value={courtId || ""}
                    onChange={(e) => setCourtId(Number(e.target.value))}
                    required
                />
            </div>
            <button type="submit">Dodaj departament</button>
        </form>
    );
};

export default AddDepartmentForm;
