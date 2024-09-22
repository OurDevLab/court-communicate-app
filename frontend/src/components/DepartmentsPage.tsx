import React, { useState, useEffect } from "react";
import api from "../api";

interface Department {
    id: number;
    name: string;
}

const DepartmentsPage: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);

    useEffect(() => {
        api.get("/departments")
            .then((response) => setDepartments(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania departamentów:", error)
            );
    }, []);

    return (
        <div>
            <h1>Lista departamentów</h1>
            <ul>
                {departments.map((department) => (
                    <li key={department.id}>{department.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentsPage;
