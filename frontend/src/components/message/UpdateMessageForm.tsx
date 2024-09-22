import React, { useState, useEffect } from "react";
import api from "../../api";

interface Props {
    messageId: number;
}

const UpdateMessageForm: React.FC<Props> = ({ messageId }) => {
    const [message, setMessage] = useState({ content: "" });

    useEffect(() => {
        // Pobierz istniejącą wiadomość
        api.get(`/messages/${messageId}`)
            .then((response) => setMessage(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania wiadomości:", error)
            );
    }, [messageId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/messages/${messageId}`, {
                content: message.content,
            });
            alert("Wiadomość została zaktualizowana");
        } catch (error) {
            console.error("Błąd podczas aktualizacji wiadomości:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Treść wiadomości:</label>
                <input
                    type="text"
                    value={message.content}
                    onChange={(e) =>
                        setMessage({ ...message, content: e.target.value })
                    }
                    required
                />
            </div>
            <button type="submit">Zaktualizuj wiadomość</button>
        </form>
    );
};

export default UpdateMessageForm;
