import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context.jsx"
import { login, register, logout, getMe } from "../services/auth.api.js"

export const useAuth = () => {
    // Get the authentication context
    const context = useContext(AuthContext)

    // Extract authentication state and setter functions from the context
    const { user, setUser, loading, setLoading } = context

    // Handle user login
    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            // Send login credentials to the backend
            const data = await login({ email, password })

            // Store the logged-in user in the authentication context
            setUser(data.user)
            return true
        }
        catch (err) {
            console.log("Login error:", err)
            return false
        }
        finally {
            setLoading(false)
        }
    }

    // Handle user registration
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            // Send registration details to the backend
            const data = await register({ username, email, password })

            // Store the newly registered user in the authentication context
            setUser(data.user)
            return true
        }
        catch (err) {
            console.log("Register error:", err)
            return false
        }
        finally {
            setLoading(false)
        }
    }

    // Handle user logout
    const handleLogout = async () => {
        setLoading(true)
        try {
            // Send logout request to the backend
            await logout()

            // Remove the user from the authentication context
            setUser(null)
        }
        catch (err) {
            console.log("Logout error:", err)
        }
        finally {
            setLoading(false)
        }
    }

    // Check whether the user is already authenticated when the application first loads
    useEffect(() => {
        // Function to fetch the currently logged-in user
        const getAndSetUser = async () => {
            try {
                // Request the current user from the backend
                const data = await getMe()

                // Store the authenticated user in the context
                setUser(data.user)
            }
            catch (err) {
                // If the user is not authenticated remove the user from the context
                setUser(null)
                console.log("User is not logged in")
            }
            finally {
                setLoading(false)
            }
        }

        // Execute the function when the component loads
        getAndSetUser()
    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}