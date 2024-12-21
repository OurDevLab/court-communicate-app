import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(ServerPaths.REGISTER, {
                login,
                password,
                name,
                surname,
            });
            alert(ClientMessages.REGISTER_SUCCESS);
            navigate(RoutesPaths.LOGIN);
        } catch (error) {
            alert(ClientMessages.REGISTER_ERROR);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Zarejestruj się</h1>

            <form className="form-container" onSubmit={handleRegister}>
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
                <div className="form-group">
                    <label>Imię:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Nazwisko:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <button type="submit" className="form-button">
                    Zarejestruj się
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
