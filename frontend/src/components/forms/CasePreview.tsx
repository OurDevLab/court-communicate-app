import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CasePreview: React.FC = () => {
    const navigate = useNavigate();
    const { id: caseId } = useParams();

    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCase = async () => {
            try {
                const response = await axios.get(`/cases/${caseId}`);
                setCaseData(response.data);
            } catch (err) {
                setError(
                    "Wystąpił błąd podczas pobierania szczegółów sprawy:" + err
                );
            } finally {
                setLoading(false);
            }
        };
        fetchCase();
    }, [caseId]);

    if (loading) return <p>Wczytywanie szczegółów sprawy...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <button onClick={() => navigate("/cases")}>
                Wróć do wykazu spraw
            </button>
            <h1>Szczegóły sprawy</h1>
            <p>Tytuł: {caseData.title}</p>
            <p>Opis: {caseData.description}</p>
            <p>Status: {caseData.status}</p>
            <p>Sędzia: {caseData.judge}</p>
        </div>
    );
};

export default CasePreview;
