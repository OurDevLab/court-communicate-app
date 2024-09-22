import React from "react";
import api from "../api";

interface Props {
    courtId: number;
}

const DeleteCourtButton: React.FC<Props> = ({ courtId }) => {
    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć ten sąd?")) {
            api.delete(`/courts/${courtId}`)
                .then(() => alert("Sąd został usunięty"))
                .catch((error) =>
                    console.error("Błąd podczas usuwania sądu:", error)
                );
        }
    };

    return <button onClick={handleDelete}>Usuń sąd</button>;
};

export default DeleteCourtButton;
