import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/User.context";
import { uniqBy } from "lodash";

import "./Chat.css";

import {
    SidebarContent,
    SidebarFooter,
    ChatEmptyContent,
    ChatMessageBox,
    ChatForm,
} from ".";
import api from "../../api";
import { Navigation } from "../dashboard";
import { useNavigate } from "react-router-dom";

import {
    ConfigVariables,
    ServerPaths,
    RoutesPaths,
    ClientMessages,
} from "../../config";

const { CASES, CASE, MESSAGES } = ServerPaths;
const { LOGIN } = RoutesPaths;
const { webSocketURL, webSocketTimeout, tokenKey, messageEvent, closeEvent } =
    ConfigVariables;
const {
    ERROR_FETCHING_CASES,
    ERROR_FETCHING_MESSAGES,
    MISSING_SENDER_OR_SELECTED_ID,
} = ClientMessages;

const Chat: React.FC = () => {
    const navigate = useNavigate();

    const [ws, setWs] = useState<WebSocket | null>(null);
    const [cases, setCases] = useState([]);
    const [selectedCaseId, setSelectedCaseId] = useState<number | null>(null);
    const [messages, setMessages] = useState([]);
    const [newMessageText, setNewMessageText] = useState("");

    const { id, username, setId, setUsername } = useContext(UserContext);
    const divUnderMessages = useRef<HTMLDivElement>(null);

    useEffect(() => {
        connectToWs();
    }, []);

    function connectToWs() {
        const ws = new WebSocket(webSocketURL);
        setWs(ws);

        ws.addEventListener(messageEvent, handleMessage);
        ws.addEventListener(closeEvent, () => {
            setTimeout(connectToWs, webSocketTimeout);
        });
    }

    useEffect(() => {
        fetchCases();
    }, []);

    async function fetchCases() {
        try {
            const res = await api.get(CASES);
            setCases(res.data);
        } catch (error) {
            console.error(ERROR_FETCHING_CASES, error);
        }
    }

    useEffect(() => {
        if (selectedCaseId) fetchMessages();
    }, [selectedCaseId]);

    async function fetchMessages() {
        try {
            const res = await api.get(`${MESSAGES}${CASE}/${selectedCaseId}`);
            setMessages(res.data);
        } catch (error) {
            console.error(ERROR_FETCHING_MESSAGES, error);
        }
    }

    function handleMessage(event: MessageEvent) {
        const data = JSON.parse(event.data);
        if (data.caseId === selectedCaseId) {
            setMessages((prev) => [...prev, data]);
        }
    }

    function sendMessage(ev?: React.FormEvent, file = null) {
        if (ev) ev.preventDefault();

        if (!id || !selectedCaseId) {
            console.error(MISSING_SENDER_OR_SELECTED_ID);
            return;
        }

        ws?.send(
            JSON.stringify({
                caseId: selectedCaseId,
                senderId: id,
                recipientId: null,
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
        setId(null);
        setUsername(null);
        localStorage.removeItem(tokenKey);
        navigate(LOGIN);
    }

    useEffect(() => {
        divUnderMessages.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const messagesWithoutDupes = uniqBy(messages, "id");

    return (
        <div className="container">
            <Navigation />
            <div className="chat-container">
                <aside className="chat-sidebar">
                    <SidebarContent
                        cases={cases}
                        selectedCaseId={selectedCaseId}
                        setSelectedCaseId={setSelectedCaseId}
                    />
                    <SidebarFooter username={username} logout={logout} />
                </aside>

                <main className="chat-main">
                    {!selectedCaseId && <ChatEmptyContent />}
                    {selectedCaseId && (
                        <>
                            <ChatMessageBox
                                messages={messagesWithoutDupes}
                                userId={id}
                                inputRef={divUnderMessages}
                            />
                            <ChatForm
                                newMessageText={newMessageText}
                                setNewMessageText={setNewMessageText}
                                sendMessage={sendMessage}
                                sendFile={sendFile}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Chat;
