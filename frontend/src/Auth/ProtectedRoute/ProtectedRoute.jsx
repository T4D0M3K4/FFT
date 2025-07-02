import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const ProtectedRoute = ({role, children}) => {
    const { user } = useContext(AuthContext);
    if (!user || (user && role && user.USER_ROLE !== role)) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;