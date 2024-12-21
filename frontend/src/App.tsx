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

import {
    CassationForm,
    ComplaintForm,
    JudgmentForm,
    OrdinanceForm,
} from "./components/document";

import { PrivateRoute } from ".";
import { UserContextProvider } from "./context/User.context";

import { RoutesPaths } from "./config";

const {
    LOGIN,
    REGISTER,
    DASHBOARD,
    COURTS,
    CASES,
    USERS,
    DOCUMENTS,
    DEPARTMENTS,
    CHAT,

    ADD,
    EDIT,
    PREVIEW,
    ID_PARAM,

    CASSATION,
    COMPLAINT,
    JUDGMENT,
    ORDINANCE,
} = RoutesPaths;

const App: React.FC = () => {
    return (
        <UserContextProvider>
            <Router>
                <Routes>
                    <Route path={LOGIN} element={<LoginForm />} />
                    <Route path={REGISTER} element={<RegisterForm />} />

                    <Route element={<PrivateRoute />}>
                        <Route path={DASHBOARD} element={<Dashboard />} />
                        <Route path={COURTS} element={<CourtsList />} />
                        <Route path={CASES} element={<CasesList />} />
                        <Route path={USERS} element={<UsersList />} />
                        <Route path={DOCUMENTS} element={<DocumentsPanel />} />
                        <Route
                            path={`${COURTS}${ID_PARAM}${DEPARTMENTS}`}
                            element={<DepartmentsList />}
                        />
                        <Route path={CHAT} element={<Chat />} />

                        <Route
                            path={`${USERS}${ADD}`}
                            element={<AddUserForm />}
                        />
                        <Route
                            path={`${CASES}${ADD}`}
                            element={<AddCaseForm />}
                        />
                        <Route
                            path={`${COURTS}${ADD}`}
                            element={<AddCourtForm />}
                        />

                        <Route
                            path={`${DEPARTMENTS}${ADD}`}
                            element={<AddDepartmentForm />}
                        />

                        <Route
                            path={`${CASES}${EDIT}${ID_PARAM}`}
                            element={<UpdateCaseForm />}
                        />
                        <Route
                            path={`${COURTS}${EDIT}${ID_PARAM}`}
                            element={<UpdateCourtForm />}
                        />

                        <Route
                            path={`${DEPARTMENTS}${EDIT}${ID_PARAM}`}
                            element={<UpdateDepartmentForm />}
                        />
                        <Route
                            path={`${USERS}${EDIT}${ID_PARAM}`}
                            element={<UpdateUserForm />}
                        />

                        <Route
                            path={`${COURTS}${PREVIEW}${ID_PARAM}`}
                            element={<CourtPreview />}
                        />
                        <Route
                            path={`${CASES}${PREVIEW}${ID_PARAM}`}
                            element={<CasePreview />}
                        />
                        <Route
                            path={`${USERS}${PREVIEW}${ID_PARAM}`}
                            element={<UserPreview />}
                        />

                        <Route
                            path={`${DOCUMENTS}${CASSATION}`}
                            element={<CassationForm />}
                        />
                        <Route
                            path={`${DOCUMENTS}${COMPLAINT}`}
                            element={<ComplaintForm />}
                        />
                        <Route
                            path={`${DOCUMENTS}${JUDGMENT}`}
                            element={<JudgmentForm />}
                        />
                        <Route
                            path={`${DOCUMENTS}${ORDINANCE}`}
                            element={<OrdinanceForm />}
                        />
                    </Route>
                </Routes>
            </Router>
        </UserContextProvider>
    );
};

export default App;
