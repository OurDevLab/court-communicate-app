import { useState, useContext } from "react";
import { UserContext } from "../../context/User.context";
import api from "../../api";

const ComplaintForm: React.FC = () => {
    const { id: userId } = useContext(UserContext);
    const [formData, setFormData] = useState({
        caseId: "",
        date: "",
        complainant: "",
        complainantAddress: "",
        complainantKRS: "",
        complaintContent: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
                type: "complaint",
                content: formData,
            };

            const response = await api.post(`/documents`, payload);
            if (response.status === 201) {
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
