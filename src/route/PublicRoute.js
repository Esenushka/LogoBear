import { Navigate } from "react-router-dom";

export default function PublicRoute({ component: Component, auth }) {
    if (!auth?.access_token) {
        return Component 
    }
    return <Navigate to="/jogs" />
}
