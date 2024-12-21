import React, { useContext, useState } from "react";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";

import {
    ServerPaths,
    ConfigVariables,
    RoutesPaths,
    ClientMessages,
} from "../../config";

const { tokenKey } = ConfigVariables;

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { setId, setUsername } = useContext(UserContext);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post(ServerPaths.LOGIN, {
                login,
                password,
            });

            const { token } = response.data;
            if (token) {
                localStorage.setItem(tokenKey, token);

                const decoded: { id: number; username: string } =
                    jwtDecode(token);
                setId(decoded.id);
                setUsername(decoded.username);

                alert(response.data.message);
                navigate(RoutesPaths.DASHBOARD);
            } else {
                alert(ClientMessages.ERROR_FETCHING_TOKEN);
            }
        } catch (error) {
            console.error(ClientMessages.LOGIN_ERROR, error);
            alert(ClientMessages.LOGIN_ERROR);
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
                <p>
                    Nie masz konta? Skorzystaj z{" "}
                    <Link to={RoutesPaths.REGISTER}>
                        formularza rejestracji
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
