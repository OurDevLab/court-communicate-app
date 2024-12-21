import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const UpdateUserForm: React.FC = () => {
    const navigate = useNavigate();
    const { id: userId } = useParams();

    const [user, setUser] = useState({
        login: "",
        name: "",
        surname: "",
        role: "CITIZEN",
    });

    useEffect(() => {
        api.get(`${ServerPaths.USERS}/${userId}`)
            .then((response) => setUser(response.data))
            .catch((error) =>
                console.error(ClientMessages.USER_EDITING_ERROR, error)
            );
    }, [userId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        api.put(`${ServerPaths.USERS}/${userId}`, user)
            .then(() => alert(ClientMessages.USER_EDITING_SUCCESS))
            .catch((error) =>
                console.error(ClientMessages.USER_EDITING_ERROR, error)
            );
    };

    return (
        <div className="form-wrapper">
            <h1>Edytuj użytkownika</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Imię: </label>
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Nazwisko: </label>
                    <input
                        type="text"
                        value={user.surname}
                        onChange={(e) =>
                            setUser({ ...user, surname: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Rola: </label>
                    <select
                        value={user.role}
                        onChange={(e) =>
                            setUser({ ...user, role: e.target.value })
                        }
                    >
                        <option value="CITIZEN">Strona</option>
                        <option value="CLERK">Urzędnik</option>
                        <option value="JUDGE">Sędzia</option>
                        <option value="ADMIN">Administrator</option>
                    </select>
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Zaktualizuj użytkownika
                    </button>
                    <button
                        onClick={() => navigate(RoutesPaths.USERS)}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserForm;
