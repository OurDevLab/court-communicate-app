import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourtForm: React.FC = () => {
    const navigate = useNavigate();
    const { id: courtId } = useParams();

    const [court, setCourt] = useState({
        name: "",
        seat: "",
        court_type: "",
    });

    useEffect(() => {
        api.get(`/courts/${courtId}`)
            .then((response) => setCourt(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania sądu:", error)
            );
    }, [courtId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/courts/${courtId}`, {
                name: court.name,
                seat: court.seat,
                court_type: court.court_type,
            });
            alert("Sąd został zaktualizowany");
        } catch (error) {
            console.error("Błąd podczas aktualizacji sądu:", error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Edytuj sąd</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nazwa sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={court.name}
                        onChange={(e) =>
                            setCourt({ ...court, name: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Siedziba sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={court.seat}
                        onChange={(e) =>
                            setCourt({ ...court, seat: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Typ sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={court.court_type}
                        onChange={(e) =>
                            setCourt({ ...court, court_type: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Zaktualizuj sąd
                    </button>
                    <button
                        onClick={() => navigate("/courts")}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCourtForm;
