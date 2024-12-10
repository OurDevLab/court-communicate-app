import { useState } from "react";
//import axios from "axios";


//Cuda z API
interface Props {
    onDocumentAdded: (data) => void;
}
const AddCassationForm: React.FC<Props> = ({ onDocumentAdded }) => {
    const [formData, setFormData] = useState({
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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSumbit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <form className="form-container" onSubmit={handleSumbit}>
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
                <label htmlFor="referenceNumber">Sygnatura akt</label>
                <input
                    id="referenceNumber"
                    name="referenceNumber"
                    type="text"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz sygnature akt"
                />
            </div>

            <div className="form-group">
                <label htmlFor="judgment">Typ orzeczenia</label>
                <select
                    id="jugment"
                    name="jugment"
                    value={formData.signature}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="">Wybierz typ orzeczenia</option>
                    <option value="sentence">Wyrok</option>
                    <option value="resolution">Postanowienie</option>
                </select>
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

            {/* 
                Nie za bardzo ogarniam, żeby zrozumieć nawet to co mi podpowiedział chatGPT, dlatego zostawiam do w komentarzu
                szczególnie, że wymaga to zakodownia połączenia do API, co niby też czat pokazał, ale no... znajomość języka :)

                <div className="form-group">
                <label htmlFor="court">Wybierz sąd:</label>
                <select
                    id="court"
                    name="court"
                    //value={selectedCourt} 
                    //onChange={handleChange}
                    className="form-input"
                >
                    <option value="" disabled>Wybierz...</option>
                    {courts.map((court) => (
                        <option key={court.id} value={court.id}>
                            {court.name}
                        </option>
                    ))}
                </select>
            <p>Wybrany sąd: {selectedCourt}</p>
            </div>*/}

            <div className="form-group">
                <label htmlFor="judge">Wpisz skład sądu</label>
                <input
                    id="jugde"
                    name="judge"
                    type="text"
                    value={formData.judge}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz skład sądu"
                />
            </div>

            <div className="form-group">
                <label htmlFor="party">Wpisz strony</label>
                <input
                    id="party"
                    name="party"
                    type="text"
                    value={formData.party}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz strony"
                />
            </div>

            <div className="form-group">
                <label htmlFor="caseSubject">Wpisz przedmiot sprawy</label>
                <input
                    id="caseSubject"
                    name="caseSubject"
                    type="text"
                    value={formData.caseSubject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz przedmiot sprawy"
                />
            </div>

            <div className="form-group">
                <label htmlFor="courtJugment">Wpisz rostrzygnięcie</label>
                <input
                    id="courtJugment"
                    name="courtJugment"
                    type="text"
                    value={formData.courtJugment}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz rostrzygnięcie"
                />
            </div>

            <div className="form-group">
                <label htmlFor="justification">Wpisz uzasadnienie</label>
                <input
                    id="justification"
                    name="justification"
                    type="text"
                    value={formData.justification}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz uzasadnienie"
                />
            </div>

            <div className="form-group">
                <label htmlFor="signature">Podpis</label>
                <input
                    id="signature"
                    name="signature"
                    type="text"
                    value={formData.signature}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Wpisz podpis"
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
