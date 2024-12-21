import React from "react";
import { useNavigate } from "react-router-dom";

import { RoutesPaths } from "../../config";
const { DASHBOARD, COURTS, CASES, DOCUMENTS, USERS, CHAT } = RoutesPaths;

const Navigation: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="dashboard-nav">
            <ul className="dashboard-nav-list">
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate(DASHBOARD)}
                >
                    Strona główna
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate(COURTS)}
                >
                    Sądy
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate(CASES)}
                >
                    Sprawy
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate(DOCUMENTS)}
                >
                    Dokumenty
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate(USERS)}
                >
                    Użytkownicy
                </li>
                <li
                    className="dashboard-nav-item"
                    onClick={() => navigate(CHAT)}
                >
                    Komunikacja
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
