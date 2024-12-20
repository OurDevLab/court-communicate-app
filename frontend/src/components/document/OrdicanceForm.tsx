import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/User.context";
import api from "../../api";
import { Navigation } from "../dashboard";
import { useNavigate } from "react-router-dom";

const OrdinanceForm: React.FC = () => {
    const navigate = useNavigate();

    const { id: userId } = useContext(UserContext);
    const [formData, setFormData] = useState({
        date: "",
        location: "",
        caseId: "",
        judge: "",
        content: "",
    });

    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await api.get("/cases");
                setCases(response.data);
            } catch (error) {
                console.error("Błąd podczas pobierania listy spraw", error);
            }
        };

        fetchCases();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
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
                userId,
                type: "ordinance",
                content: formData,
            };

            const response = await api.post(`/documents`, payload);
            if (response.status === 201) {
                alert("Zarządzenie zostało dodane.");
            }
        } catch (error) {
            console.error("Błąd podczas dodawania zarządzenia", error);
            alert("Nie udało się dodać zarządzenia.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <Navigation />
            <h1 className="header">Formularz zarządzenia</h1>

            <div className="form-group">
                <label htmlFor="date">Data</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

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
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="caseId">Sygnatura akt</label>
                <select
                    id="caseId"
                    name="caseId"
                    value={formData.caseId}
                    onChange={handleChange}
                    className="form-input"
                    required
                >
                    <option value="">Wybierz sprawę</option>
                    {cases.map((caseItem) => (
                        <option key={caseItem.case_id} value={caseItem.case_id}>
                            {caseItem.case_identifier}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="judge">Sędzia</label>
                <input
                    id="judge"
                    name="judge"
                    type="text"
                    value={formData.judge}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz nazwisko sędziego"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="content">Treść zarządzenia</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="form-input"
                    rows={6}
                    placeholder="Wpisz treść zarządzenia"
                    required
                ></textarea>
            </div>

            <div className="form-buttons-group">
                <button type="submit" className="form-button">
                    Dodaj zarządzenie
                </button>

                <button
                    onClick={() => navigate("/documents")}
                    className="form-button form-button-cancel"
                >
                    Anuluj
                </button>
            </div>
        </form>
    );
};

export default OrdinanceForm;
