import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    Login,
    Register,
    Dashboard,
    AddUserForm,
    UsersPage,
} from "./components";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/add-user" element={<AddUserForm />} />
            </Routes>
        </Router>
    );
};

export default App;
