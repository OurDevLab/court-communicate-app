import React from "react";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const ChatEmptyContent: React.FC = () => {
    return (
        <div className="flex flex-col empty-content-container">
            <h3 className="empty-content-title">
                Witaj w aplikacji do komunikacji!
            </h3>
            <AccountBalanceIcon className="empty-content-logo" />
            <div className="empty-content-subtitle">
                &larr; Wybierz sprawę z panelu bocznego
            </div>
        </div>
    );
};

export default ChatEmptyContent;
