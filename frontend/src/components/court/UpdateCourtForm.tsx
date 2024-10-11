import React, { useState, useEffect } from "react";
import api from "../../api";

interface Props {
    courtId: number;
}

const UpdateCourtForm: React.FC<Props> = ({ courtId }) => {
    const [court, setCourt] = useState({
        name: "",
        seat: "",
        court_type: "",
    });

    useEffect(() => {
        // Pobierz istniejący sąd
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nazwa sądu:</label>
                <input
                    type="text"
                    value={court.name}
                    onChange={(e) =>
                        setCourt({ ...court, name: e.target.value })
                    }
                    required
                />
            </div>
            <div>
                <label>Siedziba sądu:</label>
                <input
                    type="text"
                    value={court.seat}
                    onChange={(e) =>
                        setCourt({ ...court, seat: e.target.value })
                    }
                    required
                />
            </div>
            <div>
                <label>Typ sądu:</label>
                <input
                    type="text"
                    value={court.court_type}
                    onChange={(e) =>
                        setCourt({ ...court, court_type: e.target.value })
                    }
                    required
                />
            </div>
            <button type="submit">Zaktualizuj sąd</button>
        </form>
    );
};

export default UpdateCourtForm;
