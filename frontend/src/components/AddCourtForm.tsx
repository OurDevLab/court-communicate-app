import React, { useState } from "react";
import api from "../api";

const AddCourtForm: React.FC = () => {
    const [name, setName] = useState("");
    const [seat, setSeat] = useState("");
    const [courtType, setCourtType] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/courts", { name, seat, court_type: courtType });
            alert("Sąd został dodany");
        } catch (error) {
            console.error("Błąd podczas dodawania sądu:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nazwa sądu:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Siedziba sądu:</label>
                <input
                    type="text"
                    value={seat}
                    onChange={(e) => setSeat(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Typ sądu:</label>
                <input
                    type="text"
                    value={courtType}
                    onChange={(e) => setCourtType(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Dodaj sąd</button>
        </form>
    );
};

export default AddCourtForm;
