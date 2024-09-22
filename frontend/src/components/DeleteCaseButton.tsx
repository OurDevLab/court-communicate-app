import React from "react";
import api from "../api";

interface Props {
    caseId: number;
}

const DeleteCaseButton: React.FC<Props> = ({ caseId }) => {
    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć tę sprawę?")) {
            api.delete(`/cases/${caseId}`)
                .then(() => alert("Sprawa została usunięta"))
                .catch((error) =>
                    console.error("Błąd podczas usuwania sprawy:", error)
                );
        }
    };

    return <button onClick={handleDelete}>Usuń sprawę</button>;
};

export default DeleteCaseButton;
