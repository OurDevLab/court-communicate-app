import React from "react";
import api from "../../api";

interface Props {
    userId: number;
}

const DeleteUserButton: React.FC<Props> = ({ userId }) => {
    const handleDelete = () => {
        if (window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) {
            api.delete(`/users/${userId}`)
                .then(() => alert("Użytkownik został usunięty"))
                .catch((error) =>
                    console.error("Błąd podczas usuwania użytkownika:", error)
                );
        }
    };

    return <button onClick={handleDelete}>Usuń użytkownika</button>;
};

export default DeleteUserButton;
