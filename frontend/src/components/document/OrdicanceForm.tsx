import axios from "axios";
import { useState } from "react";

interface Props {
    onOrdinanceSaved: (data) => void;
}

const OrdinanceForm: React.FC<Props> = ({ onOrdinanceSaved }) => {
    const [formData, setFormData] = useState({
        symbol: "",
        judge: "",
        form: "",
        epuapAddress: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/ordinances`, formData);
            if (response.status === 201) {
                onOrdinanceSaved(response.data);
                alert("Zarządzenie zostało zapisane.");
            }
        } catch (error) {
            console.error("Błąd podczas zapisywania zarządzenia", error);
            alert("Nie udało się zapisać zarządzenia.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="symbol">Symbol</label>
                <input
                    id="symbol"
                    name="symbol"
                    type="text"
                    value={formData.symbol}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Symbol (np. I SA/Gl)"
                />
            </div>

            <div className="form-group">
                <label htmlFor="judge">Sędzia sprawozdawca</label>
                <input
                    id="judge"
                    name="judge"
                    type="text"
                    value={formData.judge}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Nazwisko sędziego"
                />
            </div>

            <div className="form-group">
                <label htmlFor="form">Forma akt</label>
                <select
                    id="form"
                    name="form"
                    value={formData.form}
                    onChange={handleChange}
                    className="form-input"
                >
                    <option value="">Wybierz formę</option>
                    <option value="papier">Papier</option>
                    <option value="elektronika">Elektronika</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="epuapAddress">Adres ePUAP</label>
                <input
                    id="epuapAddress"
                    name="epuapAddress"
                    type="text"
                    value={formData.epuapAddress}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Adres ePUAP"
                />
            </div>

            <div className="form-buttons-group">
                <button type="submit" className="form-button">
                    Zapisz
                </button>
            </div>
        </form>
    );
};

export default OrdinanceForm;
