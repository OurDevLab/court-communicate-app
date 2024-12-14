import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
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
                        onClick={() => navigate("/chat")}
                    >
                        Komunikacja
                    </li>
                </ul>
            </nav>

            <h1 className="dashboard-header">Application Dashboard</h1>

            <div className="dashboard-grid">
                <div
                    className="dashboard-card"
                    onClick={() => navigate("/courts")}
                >
                    <h2 className="dashboard-card-title">Courts</h2>
                    <p className="dashboard-card-description">
                        View and manage the list of courts.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/cases")}
                >
                    <h2 className="dashboard-card-title">Cases</h2>
                    <p className="dashboard-card-description">
                        Access and manage case records.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/documents/complaint")}
                >
                    <h2 className="dashboard-card-title">Complaint Form</h2>
                    <p className="dashboard-card-description">
                        File a new complaint.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/documents/cassation")}
                >
                    <h2 className="dashboard-card-title">Cassation Form</h2>
                    <p className="dashboard-card-description">
                        Submit a cassation document.
                    </p>
                </div>

                <div
                    className="dashboard-card"
                    onClick={() => navigate("/chat")}
                >
                    <h2 className="dashboard-card-title">Communicator</h2>
                    <p className="dashboard-card-description">
                        Communicate with other users.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
