import { useNavigate } from "react-router-dom";
import { Navigation } from ".";

import GavelIcon from "@mui/icons-material/Gavel";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

import { RoutesPaths } from "../../config";
const { DOCUMENTS, COMPLAINT, CASSATION, JUDGMENT, ORDINANCE } = RoutesPaths;

const DocumentsPanel: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <Navigation />
            <h1 className="header">Panel Dokumentów</h1>
            <div className="dashboard-grid">
                <div
                    className="dashboard-card"
                    onClick={() => navigate(`${DOCUMENTS}${COMPLAINT}`)}
                >
                    <h2 className="dashboard-card-title">Skarga</h2>
                    <ReceiptLongIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Formularz skargi.
                    </p>
                </div>
                <div
                    className="dashboard-card"
                    onClick={() => navigate(`${DOCUMENTS}${CASSATION}`)}
                >
                    <h2 className="dashboard-card-title">Skarga kasacyjna</h2>
                    <HistoryEduIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Formularz skargi kasacyjnej.
                    </p>
                </div>
                <div
                    className="dashboard-card"
                    onClick={() => navigate(`${DOCUMENTS}${JUDGMENT}`)}
                >
                    <h2 className="dashboard-card-title">Wyrok</h2>
                    <GavelIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Formularz wyroku.
                    </p>
                </div>
                <div
                    className="dashboard-card"
                    onClick={() => navigate(`${DOCUMENTS}${ORDINANCE}`)}
                >
                    <h2 className="dashboard-card-title">Zarządzenie</h2>
                    <ReceiptIcon className="dashboard-card-icon" />
                    <p className="dashboard-card-description">
                        Formularz zarządzenia.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentsPanel;
