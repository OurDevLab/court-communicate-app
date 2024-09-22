import React, { useState, useEffect } from "react";
import api from "../../api";

interface Props {
    departmentId: number;
}

const UpdateDepartmentForm: React.FC<Props> = ({ departmentId }) => {
    const [department, setDepartment] = useState({ name: "", court_id: -1 });

    useEffect(() => {
        // Pobierz istniejący departament
        api.get(`/departments/${departmentId}`)
            .then((response) => setDepartment(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania departamentu:", error)
            );
    }, [departmentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (department.court_id !== -1 && department.name)
                await api.put(`/departments/${departmentId}`, {
                    name: department.name,
                    court_id: department.court_id,
                });
            alert("Departament został zaktualizowany");
        } catch (error) {
            console.error("Błąd podczas aktualizacji departamentu:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nazwa departamentu:</label>
                <input
                    type="text"
                    value={department.name}
                    onChange={(e) =>
                        setDepartment({ ...department, name: e.target.value })
                    }
                    required
                />
            </div>
            <div>
                <label>ID sądu:</label>
                <input
                    type="number"
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
        </form>
    );
};

export default UpdateDepartmentForm;
