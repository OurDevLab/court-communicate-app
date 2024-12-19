import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/User.context";
import api from "../../api";

const JudgmentForm: React.FC = () => {
    const { id: userId } = useContext(UserContext);

    const [formData, setFormData] = useState({
        caseId: "",
        location: "",
        date: "",
        referenceNumber: "",
        judgment: "",
        judge: "",
        party: "",
        caseSubject: "",
        courtJugment: "",
        justification: "",
        signature: "",
        court: "",
    });

    const [courts, setCourts] = useState([]);

    useEffect(() => {
        async function fetchCourts() {
            try {
                const response = await api.get("/api/courts");
                setCourts(response.data);
            } catch (error) {
                console.error("Failed to fetch courts", error);
            }
        }

        fetchCourts();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            alert("Nie jesteś zalogowany.");
            return;
        }
        try {
            const payload = {
                caseId: formData.caseId,
                userId,
                type: "judgment",
                content: formData,
            };

            const response = await api.post(`/documents`, payload);
            if (response.status === 201) {
                alert("Dokument został dodany.");
            }
        } catch (error) {
            console.error("Błąd podczas dodawania dokumentu", error);
            alert("Nie udało się dodać dokumentu.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="location">Miejscowość</label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz miejscowość"
                />
            </div>

            <div className="form-group">
                <label htmlFor="date">Data</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="court">Wybierz sąd</label>
                <select
                    id="court"
                    name="court"
                    value={formData.court}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="">Wybierz sąd</option>
                    {courts.map((court) => (
                        <option key={court.id} value={court.name}>
                            {court.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="referenceNumber">Sygnatura akt</label>
                <input
                    id="referenceNumber"
                    name="referenceNumber"
                    type="text"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz sygnaturę akt"
                />
            </div>

            <div className="form-group">
                <label htmlFor="judgment">Typ orzeczenia</label>
                <select
                    id="judgment"
                    name="judgment"
                    value={formData.judgment}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="">Wybierz typ orzeczenia</option>
                    <option value="sentence">Wyrok</option>
                    <option value="resolution">Postanowienie</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="judge">Wpisz skład sądu</label>
                <input
                    id="judge"
                    name="judge"
                    type="text"
                    value={formData.judge}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz skład sądu"
                />
            </div>

            <div className="form-buttons-group">
                <button type="submit" className="form-button">
                    Wyślij dokument
                </button>
            </div>
        </form>
    );
};

export default JudgmentForm;
