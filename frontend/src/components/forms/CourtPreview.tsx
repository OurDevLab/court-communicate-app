import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const CourtPreview: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [court, setCourt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourt = async () => {
            try {
                const response = await api.get(`${ServerPaths.COURTS}/${id}`);
                setCourt(response.data);
            } catch (err) {
                setError(ClientMessages.COURT_PREVIEW_ERROR + err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourt();
    }, [id]);

    if (loading) return <p>Wczytywanie danych sądu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <button onClick={() => navigate(RoutesPaths.COURTS)}>
                Wróć do listy sądów
            </button>
            <h1>{court.name}</h1>
            <p>Typ: {court.type}</p>
            <p>Adres: {court.seat}</p>
            <button
                onClick={() =>
                    navigate(
                        `${RoutesPaths.COURTS}/${id}${RoutesPaths.DEPARTMENTS}`
                    )
                }
            >
                Struktura organizacyjna
            </button>
        </div>
    );
};

export default CourtPreview;
