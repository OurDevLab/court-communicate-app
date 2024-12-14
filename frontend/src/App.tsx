import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login, Register } from "./components/auth";
import { AddCaseForm, CasePreview, UpdateCaseForm } from "./components/case";
import {
    AddCourtForm,
    CourtPreview,
    UpdateCourtForm,
} from "./components/court";
import { AddUserForm, UpdateUserForm, UserPreview } from "./components/user";
import {
    AddDepartmentForm,
    UpdateDepartmentForm,
} from "./components/department";

import { Chat } from "./components/chat";

import {
    CasesList,
    CourtsList,
    Dashboard,
    DocumentsPanel,
    UsersList,
} from "./components/dashboard";
import DepartmentsList from "./components/dashboard/DepartmentsList";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courts" element={<CourtsList />} />
                <Route path="/cases" element={<CasesList />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/documents" element={<DocumentsPanel />} />
                <Route
                    path="/courts/:id/departments"
                    element={<DepartmentsList />}
                />
                <Route path="/chat" element={<Chat />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/users/add" element={<AddUserForm />} />
                <Route path="/cases/add" element={<AddCaseForm />} />
                <Route path="/courts/add" element={<AddCourtForm />} />

                <Route
                    path="/departments/add"
                    element={<AddDepartmentForm />}
                />

                <Route path="/cases/edit/:id" element={<UpdateCaseForm />} />
                <Route path="/courts/:id" element={<UpdateCourtForm />} />

                <Route
                    path="/departments/edit/:id"
                    element={<UpdateDepartmentForm />}
                />
                <Route path="/users/edit/:id" element={<UpdateUserForm />} />

                <Route path="/court/preview/:id" element={<CourtPreview />} />
                <Route path="/case/preview/:id" element={<CasePreview />} />
                <Route path="/user/preview/:id" element={<UserPreview />} />
            </Routes>
        </Router>
    );
};

export default App;
