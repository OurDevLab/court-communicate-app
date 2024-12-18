import { useNavigate } from "react-router-dom";
import { Navigation } from ".";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <Navigation />
            <h1 className="header">CourtsApp - Strona główna</h1>

            <div className="dashboard-grid">
                <div
                    className="dashboard-card"
                    onClick={() => navigate("/courts")}
                >
                    <h2 className="dashboard-card-title">Sądy</h2>
                    <p className="dashboard-card-description">
                        Zobacz i zarządzaj listą sądów.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/cases")}
                >
                    <h2 className="dashboard-card-title">Sprawy</h2>
                    <p className="dashboard-card-description">
                        Wejdź do wykazu i zarządzaj zarejestrowanymi sprawami.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/documents")}
                >
                    <h2 className="dashboard-card-title">Panel Dokumentów</h2>
                    <p className="dashboard-card-description">
                        Przejdź do panelu udostępniającego formularze dokumentów
                        do złożenia.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/users")}
                >
                    <h2 className="dashboard-card-title">Użytkownicy</h2>
                    <p className="dashboard-card-description">
                        Użyj listy użytkowników do zarządzania nimi.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/chat")}
                >
                    <h2 className="dashboard-card-title">Komunikacja</h2>
                    <p className="dashboard-card-description">
                        Skorzystaj z przystępnego komunikatora celem kontaktu w
                        wybranych sprawach.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() =>
                        alert(
                            "Uzyskaj dostęp do statystyk w zewnętrznej aplikacji StatsApp"
                        )
                    }
                >
                    <h2 className="dashboard-card-title">Statystyki</h2>
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
