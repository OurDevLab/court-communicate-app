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
const { COURTS, DOCUMENTS } = ServerPaths;
const {
    ERROR_FETCHING_COURTS,
    AUTHENTICATION_ERROR,
    COMPLAINT_ADDING_SUCCESS,
    COMPLAINT_ADDING_ERROR,
    COMPLAINT_ADDING_FAILED,
} = ClientMessages;
const { CREATED } = ServerStatuses;

const ComplaintForm: React.FC = () => {
    const navigate = useNavigate();

    const { id: userId } = useContext(UserContext);
    const [courts, setCourts] = useState([]);
    const [formData, setFormData] = useState({
        date: "",
        location: "",
        courtId: "",
        organ: "",
        complainant: "",
        proxy: "",
        complainantType: "",
        pesel: "",
        krs: "",
        nipOrRegon: "",
        attorney: "",
        subjectOfComplaint: "",
        specificAct: "",
        valueOfSubject: "",
        feeAmount: "",
        feeType: "",
        legalInterest: "",
        urgencyDetails: "",
        scopeOfComplaint: "whole",
        charges: "",
        demands: "",
        justification: "",
        attachments: "",
    });
    const [dynamicFields, setDynamicFields] = useState({
        showPesel: false,
        showKrs: false,
        showNipOrRegon: false,
        showValueField: false,
        showLegalInterestField: false,
        showUrgencyField: false,
    });

    useEffect(() => {
        const fetchCourts = async () => {
            try {
                const response = await api.get(COURTS);
                setCourts(response.data);
            } catch (error) {
                console.error(ERROR_FETCHING_COURTS, error);
            }
        };

        fetchCourts();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "complainantType") {
            setDynamicFields({
                ...dynamicFields,
                showPesel: value === "individual",
                showKrs: value === "legalEntity",
                showNipOrRegon: value === "otherUnit",
            });
        }

        if (name === "subjectOfComplaint") {
            setDynamicFields({
                ...dynamicFields,
                showValueField: value === "decision",
                showLegalInterestField: [
                    "actOfLocalLaw",
                    "actOfSupervision",
                    "otherSelfGoverningAct",
                ].includes(value),
                showUrgencyField: value === "delayOrLackOfAction",
            });
        }
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
                type: "complaint",
                content: formData,
            };

            const response = await api.post(DOCUMENTS, payload);
            if (response.status === CREATED) {
                alert(COMPLAINT_ADDING_SUCCESS);
            }
        } catch (error) {
            console.error(COMPLAINT_ADDING_ERROR, error);
            alert(COMPLAINT_ADDING_FAILED);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <Navigation />
            <h1 className="header">Formularz skargi</h1>

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
                <label htmlFor="organ">Organ</label>
                <input
                    id="organ"
                    name="organ"
                    type="text"
                    value={formData.organ}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz oznaczenie organu"
                    required
                />
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
                    placeholder="Wpisz oznaczenie skarżącego"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="proxy">Pełnomocnik</label>
                <input
                    id="proxy"
                    name="proxy"
                    type="text"
                    value={formData.proxy}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Podaj dane pełnomocnika skarżącego"
                />
            </div>
            <div className="form-group">
                <label htmlFor="complainantType">Podmiotowość</label>
                <select
                    id="complainantType"
                    name="complainantType"
                    value={formData.complainantType}
                    onChange={handleChange}
                    className="form-input"
                    required
                >
                    <option value="">
                        Określ podmiotowość prawną skarżącego
                    </option>
                    <option value="individual">Osoba fizyczna</option>
                    <option value="legalEntity">Osoba prawna</option>
                    <option value="otherUnit">
                        Inna jednostka organizacyjna
                    </option>
                </select>
            </div>

            {dynamicFields.showPesel && (
                <div className="form-group">
                    <label htmlFor="pesel">PESEL</label>
                    <input
                        id="pesel"
                        name="pesel"
                        type="text"
                        value={formData.pesel}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Wpisz numer PESEL"
                        required
                    />
                </div>
            )}
            {dynamicFields.showKrs && (
                <div className="form-group">
                    <label htmlFor="krs">KRS</label>
                    <input
                        id="krs"
                        name="krs"
                        type="text"
                        value={formData.krs}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Wpisz numer KRS"
                        required
                    />
                </div>
            )}
            {dynamicFields.showNipOrRegon && (
                <div className="form-group">
                    <label htmlFor="nipOrRegon">NIP/REGON</label>
                    <input
                        id="nipOrRegon"
                        name="nipOrRegon"
                        type="text"
                        value={formData.nipOrRegon}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Wpisz numer NIP lub REGON"
                        required
                    />
                </div>
            )}

            <div className="form-group">
                <label htmlFor="subjectOfComplaint">
                    Przedmiot zaskarżenia
                </label>
                <select
                    id="subjectOfComplaint"
                    name="subjectOfComplaint"
                    value={formData.subjectOfComplaint}
                    onChange={handleChange}
                    className="form-input"
                    required
                >
                    <option value="">Wybierz przedmiot</option>
                    <option value="decision">Decyzja</option>
                    <option value="resolution">Postanowienie</option>
                    <option value="actOfLocalLaw">Akt prawa miejscowego</option>
                    <option value="actOfSupervision">Akt nadzoru</option>
                    <option value="delayOrLackOfAction">
                        Bezczynność lub przewlekłość
                    </option>
                </select>
            </div>

            {dynamicFields.showValueField && (
                <div className="form-group">
                    <label htmlFor="valueOfSubject">
                        Wartość przedmiotu zaskarżenia
                    </label>
                    <input
                        id="valueOfSubject"
                        name="valueOfSubject"
                        type="number"
                        value={formData.valueOfSubject}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Wpisz wartość"
                    />
                </div>
            )}

            {dynamicFields.showLegalInterestField && (
                <div className="form-group">
                    <label htmlFor="legalInterest">Interes prawny</label>
                    <textarea
                        id="legalInterest"
                        name="legalInterest"
                        value={formData.legalInterest}
                        onChange={handleChange}
                        className="form-input"
                        rows={3}
                        placeholder="Opisz interes prawny w zaskarżeniu"
                    ></textarea>
                </div>
            )}

            {dynamicFields.showUrgencyField && (
                <div className="form-group">
                    <label htmlFor="urgencyDetails">Ponaglenie</label>
                    <textarea
                        id="urgencyDetails"
                        name="urgencyDetails"
                        value={formData.urgencyDetails}
                        onChange={handleChange}
                        className="form-input"
                        rows={3}
                        placeholder="Opisz szczegóły uprzedniego ponaglenia"
                    ></textarea>
                </div>
            )}

            <div className="form-group">
                <label htmlFor="scopeOfComplaint">Zakres zaskarżenia</label>
                <select
                    id="scopeOfComplaint"
                    name="scopeOfComplaint"
                    value={formData.scopeOfComplaint}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="whole">W całości</option>
                    <option value="partial">W części</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="charges">Zarzuty</label>
                <textarea
                    id="charges"
                    name="charges"
                    value={formData.charges}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder="Wpisz zarzuty"
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="demands">Wnioski (żądania)</label>
                <textarea
                    id="demands"
                    name="demands"
                    value={formData.demands}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder="Wpisz wnioski"
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
                    placeholder="Wpisz uzasadnienie skargi"
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
                    placeholder="Wymień załączniki"
                ></textarea>
            </div>

            <div className="form-buttons-group">
                <button type="submit" className="form-button">
                    Wyślij skargę
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

export default ComplaintForm;
