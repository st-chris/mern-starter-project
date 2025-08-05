import type { JSX } from "react";
import type { RootState } from "../types/redux";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

    if (isLoading) {
        return <div>Checking authentication...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div>
        <div>You must be logged in to view this page.</div>
        
        <div>
        <p>Please log in.</p>
        <LoginForm />
        Or <Link to="/register">sign up</Link>
        </div>
        </div>
        );
    }

    return children;
};

export default ProtectedRoute;