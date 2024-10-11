import React, { useState, useEffect } from "react";
import api from "../../api";

interface Court {
    id: number;
    name: string;
    seat: string;
    court_type: string;
}

const CourtsPage: React.FC = () => {
    const [courts, setCourts] = useState<Court[]>([]);

    useEffect(() => {
        api.get("/courts")
            .then((response) => setCourts(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania sądów:", error)
            );
    }, []);

    return (
        <div>
            <h1>Lista sądów</h1>
            <ul>
                {courts.map((court) => (
                    <li key={court.id}>
                        {court.name} ({court.court_type}) - {court.seat}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourtsPage;
