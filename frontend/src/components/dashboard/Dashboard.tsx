import { useNavigate } from "react-router-dom";
import { Navigation } from ".";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SmsIcon from "@mui/icons-material/Sms";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";

import { RoutesPaths, ClientMessages } from "../../config";
const { COURTS, CASES, DOCUMENTS, USERS, CHAT } = RoutesPaths;
const { STATS_APP_INFO } = ClientMessages;

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <Navigation />
            <h1 className="header">CourtsApp - Strona główna</h1>

            <div className="dashboard-grid">
                <div
                    className="dashboard-card"
                    onClick={() => navigate(COURTS)}
                >
                    <h2 className="dashboard-card-title">Sądy</h2>
                    <AccountBalanceIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Zobacz i zarządzaj listą sądów.
                    </p>
                </div>

                <div className="dashboard-card" onClick={() => navigate(CASES)}>
                    <h2 className="dashboard-card-title">Sprawy</h2>
                    <WorkIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Wejdź do wykazu i zarządzaj zarejestrowanymi sprawami.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate(DOCUMENTS)}
                >
                    <h2 className="dashboard-card-title">Panel Dokumentów</h2>
                    <ReceiptLongIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Przejdź do panelu udostępniającego formularze dokumentów
                        do złożenia.
                    </p>
                </div>

                <div className="dashboard-card" onClick={() => navigate(USERS)}>
                    <h2 className="dashboard-card-title">Użytkownicy</h2>
                    <PeopleIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Użyj listy użytkowników do zarządzania nimi.
                    </p>
                </div>

                <div className="dashboard-card" onClick={() => navigate(CHAT)}>
                    <h2 className="dashboard-card-title">Komunikacja</h2>
                    <SmsIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Skorzystaj z przystępnego komunikatora celem kontaktu w
                        wybranych sprawach.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => alert(STATS_APP_INFO)}
                >
                    <h2 className="dashboard-card-title">Statystyki</h2>
                    <StackedLineChartIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Uzyskaj dostęp do statystyk w zewnętrznej aplikacji{" "}
                        <strong>StatsApp</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
