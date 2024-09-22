import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    Login,
    Register,
    Dashboard,
    AddUserForm,
    UsersPage,
    AddCaseForm,
    AddCourtForm,
    AddDepartmentForm,
    DeleteCourtButton,
    DeleteDepartmentButton,
    DeleteMessageButton,
    UpdateCourtForm,
    UpdateMessageForm,
    UpdateDepartmentForm,
    CasesPage,
    CourtsPage,
    DepartmentsPage,
} from "./components";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
