import React, { useState } from "react";
import api from "../../api";
import { Button } from "@mui/material";

const AddUserForm: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [role, setRole] = useState("CITIZEN");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        api.post("/users", { login, password, name, surname, role })
            .then(() => alert("Użytkownik został dodany"))
            .catch((error) =>
                console.error("Błąd podczas dodawania użytkownika:", error)
            );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Login: </label>
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Hasło: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Imię: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Nazwisko: </label>
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>
            <div>
                <label>Rola: </label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="CITIZEN">Citizen</option>
                    <option value="CLERK">Clerk</option>
                    <option value="JUDGE">Judge</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            <Button variant="contained" color="primary">
                Dodaj użytkownika
            </Button>
        </form>
    );
};

export default AddUserForm;
