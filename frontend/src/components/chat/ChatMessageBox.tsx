import api from "../../api";

interface Props {
    messages;
    userId;
    inputRef;
}

const ChatMessageBox: React.FC<Props> = ({ messages, userId, inputRef }) => {
    return (
        <div className="relative h-full">
            <div className="overflow-y-scroll chat-messages">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${
                            message.senderId === userId
                                ? "message-sent"
                                : "message-received"
                        }`}
                    >
                        <div className="message-content">
                            {message.text}
                            {message.file && (
                                <div>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`${api.defaults.baseURL}/uploads/${message.file}`}
                                    >
                                        {message.file}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <div ref={inputRef}></div>
            </div>
        </div>
    );
};

export default ChatMessageBox;
