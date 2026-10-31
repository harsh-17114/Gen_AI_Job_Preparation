import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

const Protected = ({ children }) => {
    // Get loading state and current user from authentication context
    const { loading, user } = useAuth()

    // While authentication status is being checked
    if (loading) {
        return (
            <main><h1>Loading...</h1></main>
        )
    }

    // If there is no authenticated user redirect the user to the login page
    if (!user) {
        return <Navigate to={'/login'} />
    }

    // If the user is authenticated render the protected content
    return children
}

export default Protected