import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", { login, password });
            localStorage.setItem("token", response.data.token);
            alert("Zalogowano pomyślnie");
            navigate("/");
        } catch (error) {
            alert("Błąd podczas logowania");
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Zaloguj się</h1>
            <form className="form-container" onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Login:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Hasło:</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">
                    Zaloguj się
                </button>
            </form>
        </div>
    );
};

export default LoginForm;