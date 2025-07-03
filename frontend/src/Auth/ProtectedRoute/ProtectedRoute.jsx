import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

const ProtectedRoute = ({role, children}) => {
    const { user } = useContext(AuthContext);
    if (!user) return <Navigate to='/login' />;
    if (role && user.USER_ROLE !== role) return <Navigate to="/" replace />;
    return children;
};

export default ProtectedRoute;