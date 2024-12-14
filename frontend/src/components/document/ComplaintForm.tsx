import { useState } from "react";
import api from "../../api";

interface Props {
    onComplaintSubmitted: (data) => void;
}

const ComplaintForm: React.FC<Props> = ({ onComplaintSubmitted }) => {
    const [formData, setFormData] = useState({
        date: "",
        complainant: "",
        complainantAddress: "",
        complainantKRS: "",
        complaintContent: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/complaints`, formData);
            if (response.status === 201) {
                onComplaintSubmitted(response.data);
                alert("Skarga została przesłana.");
            }
        } catch (error) {
            console.error("Błąd podczas przesyłania skargi", error);
            alert("Nie udało się przesłać skargi.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
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
                <label htmlFor="complainant">Skarżący</label>
                <input
                    id="complainant"
                    name="complainant"
                    type="text"
                    value={formData.complainant}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Nazwa Skarżącego"
                />
            </div>

            <div className="form-group">
                <label htmlFor="complainantAddress">Adres Skarżącego</label>
                <input
                    id="complainantAddress"
                    name="complainantAddress"
                    type="text"
                    value={formData.complainantAddress}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Adres"
                />
            </div>

            <div className="form-group">
                <label htmlFor="complainantKRS">KRS Skarżącego</label>
                <input
                    id="complainantKRS"
                    name="complainantKRS"
                    type="text"
                    value={formData.complainantKRS}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="KRS"
                />
            </div>

            <div className="form-group">
                <label htmlFor="complaintContent">Treść skargi</label>
                <textarea
                    id="complaintContent"
                    name="complaintContent"
                    value={formData.complaintContent}
                    onChange={handleChange}
                    className="form-input"
                    rows={4}
                    placeholder="Opisz treść skargi"
                ></textarea>
            </div>

            <div className="form-buttons-group">
                <button type="submit" className="form-button">
                    Wyślij
                </button>
            </div>
        </form>
    );
};

export default ComplaintForm;
