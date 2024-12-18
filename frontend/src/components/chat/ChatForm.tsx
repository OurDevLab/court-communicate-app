import React from "react";

interface Props {
    newMessageText: string;
    setNewMessageText: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (ev?: React.FormEvent) => void;
    sendFile: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatForm: React.FC<Props> = ({
    newMessageText,
    setNewMessageText,
    sendMessage,
    sendFile,
}) => {
    return (
        <form className="chat-form" onSubmit={sendMessage}>
            <input
                type="text"
                value={newMessageText}
                onChange={(ev) => setNewMessageText(ev.target.value)}
                placeholder="Napisz wiadomość..."
                className="chat-form-input"
            />
            <label className="chat-form-attachment">
                📎
                <input
                    type="file"
                    className="chat-form-file-input"
                    onChange={sendFile}
                />
            </label>
            <button type="submit" className="chat-form-send-button">
                ➤
            </button>
        </form>
    );
};

export default ChatForm;
