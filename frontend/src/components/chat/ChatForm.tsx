const ChatForm = ({
    newMessageText,
    setNewMessageText,
    sendMessage,
    sendFile,
}: {
    newMessageText: string;
    setNewMessageText: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: (ev?: React.FormEvent) => void;
    sendFile: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <form className="form-group" onSubmit={sendMessage}>
            <input
                type="text"
                value={newMessageText}
                onChange={(ev) => setNewMessageText(ev.target.value)}
                placeholder="Wpisz wiadomość"
                className="form-input"
            />
            <label className="form-button">
                <input type="file" className="hidden" onChange={sendFile} />
                📎
            </label>
            <button type="submit" className="form-button">
                ➤
            </button>
        </form>
    );
};

export default ChatForm;
