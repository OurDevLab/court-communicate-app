import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/User.context";

const PrivateRoute: React.FC = () => {
    const { username } = useContext(UserContext);

    return username ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
