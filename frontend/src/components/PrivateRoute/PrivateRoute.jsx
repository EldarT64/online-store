import { Navigate } from "react-router";
import useUserStore from "../../store/auth.js";

const PrivateRoute = ({ children }) => {
    const { user, isGetMeLoading } = useUserStore();

    if (isGetMeLoading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return children;
};

export default PrivateRoute;
