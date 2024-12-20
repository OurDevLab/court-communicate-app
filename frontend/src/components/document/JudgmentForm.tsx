import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/User.context";
import api from "../../api";
import { Navigation } from "../dashboard";
import { useNavigate } from "react-router-dom";

const JudgmentForm: React.FC = () => {
    const navigate = useNavigate();

    const { id: userId } = useContext(UserContext);
    const [courts, setCourts] = useState([]);
    const [cases, setCases] = useState([]);
    const [formData, setFormData] = useState({
        date: "",
        location: "",
        courtId: "",
        caseId: "",
        judge1: "",
        judge2: "",
        judge3: "",
        protocolOfficer: "",
        subject: "",
        decision: "",
        justification: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [courtsResponse, casesResponse] = await Promise.all([
                    api.get("/courts"),
                    api.get("/cases"),
                ]);
                setCourts(courtsResponse.data);
                setCases(casesResponse.data);
            } catch (error) {
                console.error("Błąd podczas pobierania danych", error);
            }
        };

        fetchData();
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
                type: "judgment",
                content: formData,
            };

            const response = await api.post(`/documents`, payload);
            if (response.status === 201) {
                alert("Wyrok został dodany.");
            }
        } catch (error) {
            console.error("Błąd podczas dodawania wyroku", error);
            alert("Nie udało się dodać wyroku.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <Navigation />
            <h1 className="header">Formularz wyroku</h1>

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
                <label htmlFor="courtId">Sąd</label>
                <select
                    id="courtId"
                    name="courtId"
                    value={formData.courtId}
                    onChange={handleChange}
                    className="form-input"
                    required
                >
                    <option value="">Wybierz sąd</option>
                    {courts.map((court) => (
                        <option key={court.id} value={court.id}>
                            {court.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Skład sądu</label>
                <input
                    name="judge1"
                    type="text"
                    value={formData.judge1}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Sędzia 1"
                    required
                />
                <input
                    name="judge2"
                    type="text"
                    value={formData.judge2}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Sędzia 2"
                    required
                />
                <input
                    name="judge3"
                    type="text"
                    value={formData.judge3}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Sędzia 3"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="protocolOfficer">Protokolant</label>
                <input
                    id="protocolOfficer"
                    name="protocolOfficer"
                    type="text"
                    value={formData.protocolOfficer}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz nazwisko protokolanta"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="subject">Przedmiot</label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz przedmiot"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="decision">Rozstrzygnięcie</label>
                <textarea
                    id="decision"
                    name="decision"
                    value={formData.decision}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder="Wpisz rozstrzygnięcie"
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="justification">Uzasadnienie</label>
                <textarea
                    id="justification"
                    name="justification"
                    value={formData.justification}
                    onChange={handleChange}
                    className="form-input"
                    rows={6}
                    placeholder="Wpisz uzasadnienie"
                    required
                ></textarea>
            </div>

            <div className="form-buttons-group">
                <button type="submit" className="form-button">
                    Dodaj wyrok
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

export default JudgmentForm;
