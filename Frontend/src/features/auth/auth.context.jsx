import { createContext, useState } from "react"

export const AuthContext = createContext()

// AuthProvider provides authentication state to its child components
export const AuthProvider = ({ children }) => {
    // Stores the currently logged-in user
    const [user, setUser] = useState(null)

    // Tracks whether the application is checking the user's authentication status
    const [loading, setLoading] = useState(true)

    return (
        // Provide authentication state and its setter functions to all components inside AuthProvider
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }} >
            {children}
        </AuthContext.Provider>
    )
}