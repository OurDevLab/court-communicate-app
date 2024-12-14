import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login, Register } from "./components/auth";
import { CasesPage, AddCaseForm } from "./components/case";
import {
    CourtsPage,
    AddCourtForm,
    UpdateCourtForm,
    DeleteCourtButton,
} from "./components/court";
import {
    DepartmentsPage,
    AddDepartmentForm,
    UpdateDepartmentForm,
    DeleteDepartmentButton,
} from "./components/department";
import { UpdateMessageForm, DeleteMessageButton } from "./components/message";
import { UsersPage, AddUserForm } from "./components/user";
import { Chat } from "./components/chat";
import { Dashboard } from "./components/dashboard";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/add" element={<AddUserForm />} />
                <Route path="/cases" element={<CasesPage />} />
                <Route path="/cases/add" element={<AddCaseForm />} />
                <Route path="/courts" element={<CourtsPage />} />
                <Route path="/courts/add" element={<AddCourtForm />} />
                <Route
                    path="/courts/:id/edit"
                    element={<UpdateCourtForm courtId={1} />}
                />
                <Route
                    path="/courts/:id/delete"
                    element={<DeleteCourtButton courtId={1} />}
                />
                <Route path="/departments" element={<DepartmentsPage />} />
                <Route
                    path="/departments/add"
                    element={<AddDepartmentForm />}
                />
                <Route path="/cases" element={<CasesPage />} />
                <Route path="/cases/add" element={<AddCaseForm />} />
                <Route
                    path="/messages/:id/edit"
                    element={<UpdateMessageForm messageId={1} />}
                />
                <Route
                    path="/messages/:id/delete"
                    element={<DeleteMessageButton messageId={1} />}
                />
                <Route
                    path="/departments/:id/edit"
                    element={<UpdateDepartmentForm departmentId={1} />}
                />
                <Route
                    path="/departments/:id/delete"
                    element={<DeleteDepartmentButton departmentId={1} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
