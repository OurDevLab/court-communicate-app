import { useState } from "react";
import axios from "axios";

interface Props {
    documentData: {
        documentId: number;
        location: string;
        date: string;
        court: string;
        complainant: string;
        attorney?: string;
        govbody: string;
        sygnature: string;
        value?: number;
        entryValue?: number;
        ordinance: string;
        sentenceDate: string;
        sygnatureSentence?: string;
        plea?: string;
        resolution?: string;
        justification?: string;
        attachments?: string;
    };
    onDocumentUpdated: (values) => void;
}

const EditCassationForm: React.FC<Props> = ({
    documentData,
    onDocumentUpdated,
}) => {
    const [formData, setFormData] = useState({ ...documentData });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `/documents/${documentData.documentId}`,
                formData
            );
            if (response.status === 200) {
                onDocumentUpdated(response.data);
                alert("Dokument został zaktualizowany.");
            }
        } catch (error) {
            console.error("Błąd podczas aktualizacji dokumentu", error);
            alert("Nie udało się zaktualizować dokumentu.");
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
                <label htmlFor="court">Sąd</label>
                <select
                    id="court"
                    name="court"
                    value={formData.court}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="">Wybierz sąd</option>
                    <option value="warszawa">Warszawie</option>
                    <option value="krakow">Krakowie</option>
                    <option value="poznan">Poznaniu</option>
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
                    placeholder="Wpisz skarżącego"
                />
            </div>

            <div className="form-group">
                <label htmlFor="attorney">Reprezentowani przez</label>
                <select
                    id="attorney"
                    name="attorney"
                    value={formData.attorney}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="">Wybierz pełnomocnika</option>
                    <option value="adwokat">Adwokata</option>
                    <option value="radca">Radcę prawnego</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="govbody">Organ</label>
                <input
                    id="govbody"
                    name="govbody"
                    type="text"
                    value={formData.govbody}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz nazwę organu"
                />
            </div>

            <div className="form-group">
                <label htmlFor="sygnature">Sygnatura akt</label>
                <input
                    id="sygnature"
                    name="sygnature"
                    type="text"
                    value={formData.sygnature}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz sygnaturę akt"
                />
            </div>

            <div className="form-group">
                <label htmlFor="value">Wartość przedmiotu zaskarżenia</label>
                <input
                    id="value"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz wartość"
                />
            </div>

            <div className="form-group">
                <label htmlFor="entryValue">Wpis</label>
                <input
                    id="entryValue"
                    name="entryValue"
                    type="number"
                    value={formData.entryValue}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz wysokość wpisu"
                />
            </div>

            <div className="form-group">
                <label htmlFor="ordinance">Rozporządzenie Rady Ministrów</label>
                <input
                    id="ordinance"
                    name="ordinance"
                    type="text"
                    value={formData.ordinance}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz rozporządzenie Rady Ministrów z dnia"
                />
            </div>

            <div className="form-group">
                <label htmlFor="sentenceDate">Wyrok z dnia</label>
                <input
                    id="sentenceDate"
                    name="sentenceDate"
                    type="date"
                    value={formData.sentenceDate}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label htmlFor="sygnatureSentence">Sygn. akt wyroku</label>
                <input
                    id="sygnatureSentence"
                    name="sygnatureSentence"
                    type="text"
                    value={formData.sygnatureSentence}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz sygnaturę wyroku"
                />
            </div>

            <div className="form-group">
                <label htmlFor="plea">Zarzuty wobec wyroku</label>
                <textarea
                    id="plea"
                    name="plea"
                    value={formData.plea}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder="Wpisz zarzuty"
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="resolution">Prośba o uchwałę</label>
                <textarea
                    id="resolution"
                    name="resolution"
                    value={formData.resolution}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder="Wpisz prośbę"
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
                    Zapisz zmiany
                </button>
            </div>
        </form>
    );
};

export default EditCassationForm;