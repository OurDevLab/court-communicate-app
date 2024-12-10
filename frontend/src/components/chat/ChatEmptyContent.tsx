import React from "react";

interface Props {}

const ChatEmptyContent: React.FC<Props> = () => {
    return (
        <div className="flex flex-col empty-content-container">
            <h3 className="empty-content-title">
                Witaj w aplikacji do komunikacji!
            </h3>
            <img
                // src={SilverPhoenixLogo} todo
                alt="phoenix-logo"
                className="empty-content-logo"
            />
            <div className="empty-content-subtitle">
                &larr; Wybierz sprawę z panelu bocznego
            </div>
        </div>
    );
};

export default ChatEmptyContent;
