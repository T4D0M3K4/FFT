import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const ProtectedRoute = ({role, children}) => {
    const { userRole } = useContext(AuthContext);
    if (!userRole || userRole !== role) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;