import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const AddUserForm: React.FC = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [role, setRole] = useState("CITIZEN");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        api.post("/users", { login, password, name, surname, role })
            .then(() => {
                alert("Użytkownik został dodany");
                navigate("/users");
            })
            .catch((error) =>
                console.error("Błąd podczas dodawania użytkownika:", error)
            );
    };

    return (
        <div className="form-wrapper">
            <h1>Dodaj użytkownika</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Login: </label>
                    <input
                        type="text"
                        className="form-input"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hasło: </label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Imię: </label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Nazwisko: </label>
                    <input
                        type="text"
                        className="form-input"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Rola: </label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="CITIZEN">Strona</option>
                        <option value="CLERK">Urzędnik</option>
                        <option value="JUDGE">Sędzia</option>
                        <option value="ADMIN">Administrator</option>
                    </select>
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Dodaj użytkownika
                    </button>
                    <button
                        onClick={() => navigate("/users")}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;
