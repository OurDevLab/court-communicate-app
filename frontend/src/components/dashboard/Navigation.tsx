import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="dashboard-nav">
            <ul className="dashboard-nav-list">
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate("/")}
                >
                    Strona główna
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate("/courts")}
                >
                    Sądy
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate("/cases")}
                >
                    Sprawy
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate("/documents")}
                >
                    Dokumenty
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate("/users")}
                >
                    Użytkownicy
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate("/chat")}
                >
                    Komunikacja
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
