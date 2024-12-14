import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CourtPreview: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [court, setCourt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourt = async () => {
            try {
                const response = await axios.get(`/courts/${id}`);
                setCourt(response.data);
            } catch (err) {
                setError("Wystąpił błąd podczas pobierania danych sądu:" + err);
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
            <button onClick={() => navigate("/courts")}>
                Wróć do listy sądów
            </button>
            <h1>{court.name}</h1>
            <p>Typ: {court.type}</p>
            <p>Adres: {court.address}</p>
            <button onClick={() => navigate(`/courts/${id}/departments`)}>
                Struktura organizacyjna
            </button>
        </div>
    );
};

export default CourtPreview;
