import React, { useState } from "react";
import api from "../api";

interface Props {
    caseId: number;
}

const AddMessageForm: React.FC<Props> = ({ caseId }) => {
    const [content, setContent] = useState("");
    const senderUserId = 1; // Identyfikator aktualnie zalogowanego użytkownika (powinien być dynamiczny)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(`/cases/${caseId}/messages`, {
                content,
                sender_user_id: senderUserId,
            });
            alert("Wiadomość została dodana");
        } catch (error) {
            console.error("Błąd podczas dodawania wiadomości:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Treść wiadomości:</label>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Dodaj wiadomość</button>
        </form>
    );
};

export default AddMessageForm;
