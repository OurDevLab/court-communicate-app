import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/User.context";
import { isArray, uniqBy } from "lodash";
import axios from "axios";

import {
    SidebarContent,
    SidebarFooter,
    ChatEmptyContent,
    ChatMessageBox,
    ChatForm,
} from ".";

interface Props {}

const Chat: React.FC<Props> = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [cases, setCases] = useState([]);
    const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
    const [messages, setMessages] = useState([]);
    const [newMessageText, setNewMessageText] = useState("");

    const { id, username, setId, setUsername } = useContext(UserContext);
    const divUnderMessages = useRef<HTMLDivElement>(null);

    useEffect(() => {
        connectToWs();
        fetchCases();
    }, []);

    function connectToWs() {
        const ws = new WebSocket("ws://localhost:5001/ws");
        setWs(ws);

        ws.addEventListener("message", handleMessage);
        ws.addEventListener("close", () => {
            setTimeout(connectToWs, 1000);
        });
    }

    async function fetchCases() {
        try {
            const res = await axios.get(`/cases`);
            if (isArray(cases)) setCases(res.data);
        } catch (error) {
            console.error("Błąd podczas pobierania spraw:", error);
        }
    }

    useEffect(() => {
        if (selectedCaseId) {
            fetchMessages();
        }
    }, [selectedCaseId]);

    async function fetchMessages() {
        try {
            const res = await axios.get(`/messages/${selectedCaseId}`);
            setMessages(res.data);
        } catch (error) {
            console.error("Błąd podczas pobierania wiadomości:", error);
        }
    }

    function handleMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);

        if (data.caseId === selectedCaseId) {
            setMessages((prev) => [...prev, data]);
        }
    }

    function sendMessage(ev?: React.FormEvent, file: any = null) {
        if (ev) ev.preventDefault();

        ws?.send(
            JSON.stringify({
                caseId: selectedCaseId,
                senderId: id,
                text: newMessageText,
                file,
            })
        );

        setMessages((prev) => [
            ...prev,
            {
                text: newMessageText,
                senderId: id,
                caseId: selectedCaseId,
                timestamp: new Date(),
            },
        ]);
        setNewMessageText("");
    }

    function sendFile(ev: React.ChangeEvent<HTMLInputElement>) {
        const file = ev.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            sendMessage(null, {
                name: file.name,
                data: reader.result,
            });
        };
    }

    function logout() {
        axios.post("/logout").then(() => {
            setWs(null);
            setId(null);
            setUsername(null);
        });
    }

    useEffect(() => {
        divUnderMessages.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const messagesWithoutDupes = uniqBy(messages, "_id");

    if (cases && cases.length)
        return (
            <div className="dashboard-wrapper">
                <div className="dashboard-header">
                    <SidebarContent
                        cases={cases}
                        selectedCaseId={selectedCaseId}
                        setSelectedCaseId={setSelectedCaseId}
                    />
                    <SidebarFooter username={username} logout={logout} />
                </div>
                <div className="flex flex-col chat-section">
                    <div className="flex-grow">
                        {!selectedCaseId && <ChatEmptyContent />}
                        {selectedCaseId && (
                            <ChatMessageBox
                                messages={messagesWithoutDupes}
                                userId={id}
                                inputRef={divUnderMessages}
                            />
                        )}
                    </div>
                    {selectedCaseId && (
                        <ChatForm
                            newMessageText={newMessageText}
                            setNewMessageText={setNewMessageText}
                            sendMessage={sendMessage}
                            sendFile={sendFile}
                        />
                    )}
                </div>
            </div>
        );
};

export default Chat;
