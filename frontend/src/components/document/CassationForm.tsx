import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/User.context";
import api from "../../api";
import { Navigation } from "../dashboard";
import { useNavigate } from "react-router-dom";

import {
    ServerPaths,
    RoutesPaths,
    ClientMessages,
    ServerStatuses,
} from "../../config";
const { COURTS, CASES, DOCUMENTS } = ServerPaths;
const {
    ERROR_FETCHING_DATA,
    AUTHENTICATION_ERROR,
    CASSATION_ADDING_SUCCESS,
    CASSATION_ADDING_ERROR,
    CASSATION_ADDING_FAILED,
} = ClientMessages;
const { CREATED } = ServerStatuses;

const CassationForm: React.FC = () => {
    const navigate = useNavigate();

    const { id: userId } = useContext(UserContext);
    const [courts, setCourts] = useState([]);
    const [cases, setCases] = useState([]);
    const [formData, setFormData] = useState({
        date: "",
        location: "",
        courtId: "",
        complainant: "",
        attorney: "",
        caseId: "",
        feeAmount: "",
        judgmentDescription: "",
        cassationCharges: "",
        cassationDemands: "",
        hearingRequest: "hearing",
        justification: "",
        attachments: "",
    });

    useEffect(() => {
        const fetchCourtsAndCases = async () => {
            try {
                const [courtsResponse, casesResponse] = await Promise.all([
                    api.get(COURTS),
                    api.get(CASES),
                ]);
                setCourts(courtsResponse.data);
                setCases(casesResponse.data);
            } catch (error) {
                console.error(ERROR_FETCHING_DATA, error);
            }
        };

        fetchCourtsAndCases();
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
            alert(AUTHENTICATION_ERROR);
            return;
        }
        try {
            const payload = {
                userId,
                type: "cassation",
                content: formData,
            };

            const response = await api.post(DOCUMENTS, payload);
            if (response.status === CREATED) {
                alert(CASSATION_ADDING_SUCCESS);
            }
        } catch (error) {
            console.error(CASSATION_ADDING_ERROR, error);
            alert(CASSATION_ADDING_FAILED);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <Navigation />
            <h1 className="header">Formularz skargi kasacyjnej</h1>
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
                <label htmlFor="courtId">Sąd I instancji</label>
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
                <label htmlFor="complainant">Skarżący</label>
                <input
                    id="complainant"
                    name="complainant"
                    type="text"
                    value={formData.complainant}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz nazwę skarżącego"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="attorney">Pełnomocnik</label>
                <input
                    id="attorney"
                    name="attorney"
                    type="text"
                    value={formData.attorney}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz nazwisko pełnomocnika"
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
                <label htmlFor="feeAmount">Wysokość uiszczonego wpisu</label>
                <input
                    id="feeAmount"
                    name="feeAmount"
                    type="number"
                    value={formData.feeAmount}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz kwotę"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="judgmentDescription">
                    Oznaczenie zaskarżonego wyroku
                </label>
                <input
                    id="judgmentDescription"
                    name="judgmentDescription"
                    type="text"
                    value={formData.judgmentDescription}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz oznaczenie wyroku"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="cassationCharges">Zarzuty kasacyjne</label>
                <textarea
                    id="cassationCharges"
                    name="cassationCharges"
                    value={formData.cassationCharges}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder="Wpisz zarzuty"
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="cassationDemands">Wnioski (żądania)</label>
                <textarea
                    id="cassationDemands"
                    name="cassationDemands"
                    value={formData.cassationDemands}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder="Wpisz wnioski"
                    required
                ></textarea>
            </div>

            <div className="form-group">
                <span>Rozprawa:</span>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="hearingRequest"
                            value="hearing"
                            checked={formData.hearingRequest === "hearing"}
                            onChange={handleChange}
                        />
                        Wniosek o rozprawę
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="hearingRequest"
                            value="waiver"
                            checked={formData.hearingRequest === "waiver"}
                            onChange={handleChange}
                        />
                        Oświadczenie o zrzeczeniu się rozprawy
                    </label>
                </div>
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

            <div className="form-group">
                <label htmlFor="attachments">Załączniki</label>
                <textarea
                    id="attachments"
                    name="attachments"
                    value={formData.attachments}
                    onChange={handleChange}
                    className="form-input"
                    rows={3}
                    placeholder="Wpisz załączniki"
                ></textarea>
            </div>

            <div className="form-buttons-group">
                <button type="submit" className="form-button">
                    Złóż skargę kasacyjną
                </button>
                <button
                    onClick={() => navigate(RoutesPaths.DOCUMENTS)}
                    className="form-button form-button-cancel"
                >
                    Anuluj
                </button>
            </div>
        </form>
    );
};

export default CassationForm;
