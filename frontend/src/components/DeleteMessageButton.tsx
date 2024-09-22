import React from "react";
import api from "../api";

interface Props {
    messageId: number;
}

const DeleteMessageButton: React.FC<Props> = ({ messageId }) => {
    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć tę wiadomość?")) {
            api.delete(`/messages/${messageId}`)
                .then(() => alert("Wiadomość została usunięta"))
                .catch((error) =>
                    console.error("Błąd podczas usuwania wiadomości:", error)
                );
        }
    };

    return <button onClick={handleDelete}>Usuń wiadomość</button>;
};

export default DeleteMessageButton;
