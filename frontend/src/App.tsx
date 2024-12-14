import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    LoginForm,
    RegisterForm,
    AddCaseForm,
    AddCourtForm,
    AddDepartmentForm,
    AddUserForm,
    UpdateCaseForm,
    UpdateCourtForm,
    UpdateDepartmentForm,
    UpdateUserForm,
    CasePreview,
    CourtPreview,
    UserPreview,
} from "./components/forms";

import { Chat } from "./components/chat";

import {
    CasesList,
    CourtsList,
    Dashboard,
    DepartmentsList,
    DocumentsPanel,
    UsersList,
} from "./components/dashboard";

// import {
//     AddCassationForm,
//     ComplaintForm,
//     JudgmentForm,
//     OrdinanceForm,
// } from "./components/document";

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

                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />

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

                {/* <Route path="/documents/cassation/add/" element={<AddCassationForm />} />
                <Route path="/documents/cassation/edit/" element={<AddCassationForm />} />
                <Route path="/documents/complaint/add" element={<ComplaintForm />} />
                <Route path="/documents/judgment/add" element={<JudgmentForm />} />
                <Route path="/documents/ordinance/add" element={<OrdinanceForm />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
