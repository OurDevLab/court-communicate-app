import React, { useState, useEffect } from "react";
import api from "../api";

interface Case {
    case_id: number;
    case_identifier: string;
    case_type: string;
    case_description: string;
}

const CasesPage: React.FC = () => {
    const [cases, setCases] = useState<Case[]>([]);

    useEffect(() => {
        api.get("/cases")
            .then((response) => setCases(response.data))
            .catch((error) =>
                console.error("Błąd podczas pobierania spraw:", error)
            );
    }, []);

    return (
        <div>
            <h1>Lista spraw</h1>
            <ul>
                {cases.map((c) => (
                    <li key={c.case_id}>
                        {c.case_identifier}: {c.case_type} -{" "}
                        {c.case_description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CasesPage;
