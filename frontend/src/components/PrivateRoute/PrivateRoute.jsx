import { useAuth } from '../../hooks/useAuth.js';
import {Navigate} from "react-router";

const PrivateRoute = ({ children }) => {
    const { data: user, isLoading } = useAuth();

    if (isLoading) return <div>Загрузка...</div>;

    if (!user) return <Navigate to="/login" replace />;

    return children;
};

export default PrivateRoute;
