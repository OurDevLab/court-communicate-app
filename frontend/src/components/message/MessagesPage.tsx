import React, { useState, useEffect } from "react";
import api from "../../api";

interface Message {
    id: number;
    content: string;
    sender_user_id: number;
}

interface Props {
    caseId: number;
}

const MessagesPage: React.FC<Props> = ({ caseId }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        api.get(`/cases/${caseId}/messages`)
            .then((response) => setMessages(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania wiadomości:", error)
            );
    }, [caseId]);

    return (
        <div>
            <h1>Wiadomości</h1>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        {message.content} (Wysłane przez użytkownika{" "}
                        {message.sender_user_id})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesPage;
