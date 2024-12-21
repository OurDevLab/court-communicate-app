import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/User.context";

import { RoutesPaths } from "./config";
const { LOGIN } = RoutesPaths;

const PrivateRoute: React.FC = () => {
    const { id } = useContext(UserContext);

    return id ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default PrivateRoute;
