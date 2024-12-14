import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

const DocumentsPanel: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <Navigation />
            <h1 className="header">Panel Dokumentów</h1>
            <div className="dashboard-grid">
                <div
                    className="dashboard-card"
                    onClick={() => navigate("/documents/complaint")}
                >
                    <h2 className="dashboard-card-title">Skarga</h2>
                    <p className="dashboard-card-description">
                        Formularz skargi na decyzję lub postanowienie.
                    </p>
                </div>
                <div
                    className="dashboard-card"
                    onClick={() => navigate("/documents/cassation")}
                >
                    <h2 className="dashboard-card-title">Skarga kasacyjna</h2>
                    <p className="dashboard-card-description">
                        Formularz skargi kasacyjnej od wyroku sądu I instancji.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentsPanel;
