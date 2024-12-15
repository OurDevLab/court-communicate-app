import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/User.context";

const PrivateRoute: React.FC = () => {
    const { id } = useContext(UserContext);

    return id ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
