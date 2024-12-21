import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";

const UpdateCourtForm: React.FC = () => {
    const navigate = useNavigate();
    const { id: courtId } = useParams();

    const [court, setCourt] = useState({
        name: "",
        seat: "",
        court_type: "",
    });

    useEffect(() => {
        api.get(`${ServerPaths.COURTS}/${courtId}`)
            .then((response) => setCourt(response.data))
            .catch((error) =>
                console.error(ClientMessages.COURT_EDITING_ERROR, error)
            );
    }, [courtId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`${ServerPaths.COURTS}/${courtId}`, {
                name: court.name,
                seat: court.seat,
                court_type: court.court_type,
            });
            alert(ClientMessages.COURT_EDITING_SUCCESS);
        } catch (error) {
            console.error(ClientMessages.COURT_EDITING_ERROR, error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Edytuj sąd</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nazwa sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={court.name}
                        onChange={(e) =>
                            setCourt({ ...court, name: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Siedziba sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={court.seat}
                        onChange={(e) =>
                            setCourt({ ...court, seat: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Typ sądu:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={court.court_type}
                        onChange={(e) =>
                            setCourt({ ...court, court_type: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="form-buttons-group">
                    <button type="submit" className="form-button">
                        Zaktualizuj sąd
                    </button>
                    <button
                        onClick={() => navigate(RoutesPaths.COURTS)}
                        className="form-button form-button-cancel"
                    >
                        Anuluj
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCourtForm;
