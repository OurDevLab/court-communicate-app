import React from "react";
import api from "../api";

interface Props {
    departmentId: number;
}

const DeleteDepartmentButton: React.FC<Props> = ({ departmentId }) => {
    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć ten departament?")) {
            api.delete(`/departments/${departmentId}`)
                .then(() => alert("Departament został usunięty"))
                .catch((error) =>
                    console.error("Błąd podczas usuwania departamentu:", error)
                );
        }
    };

    return <button onClick={handleDelete}>Usuń departament</button>;
};

export default DeleteDepartmentButton;
