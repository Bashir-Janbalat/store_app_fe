import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {user} = useAuth();

    if (!user) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
