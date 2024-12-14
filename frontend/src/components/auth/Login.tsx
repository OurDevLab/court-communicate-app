import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
        <form onSubmit={handleLogin}>
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
            <button type="submit">Zaloguj się</button>
        </form>
    );
};

export default Login;
