import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const {  user } = useAuth();

    if (user?.role === "ADMIN") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
