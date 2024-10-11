import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/register", { login, password, name, surname });
            alert("Rejestracja zakończona sukcesem");
            navigate("/login");
        } catch (error) {
            alert("Błąd podczas rejestracji");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                <label>Login:</label>
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Hasło:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Imię:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Nazwisko:</label>
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>
            <button type="submit">Zarejestruj się</button>
        </form>
    );
};

export default Register;
