import axios from "axios"

// Create a reusable Axios instance
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// Register a new user
export async function register({ username, email, password }) {
    try {
        // Send the registration details to the backend
        const response = await api.post("/api/auth/register", {
            username,
            email,
            password
        })

        // Return the response data received from the backend
        return response.data
    }
    catch (err) {
        console.log("Register error:", err.response?.data || err.message)
    }
}

// Login an existing user
export async function login({ email, password }) {
    try {
        // Send login credentials to the backend
        const response = await api.post("/api/auth/login", {
            email,
            password
        })

        // Return the response data received from the backend
        return response.data
    }
    catch (err) {
        console.log("Login error:", err.response?.data || err.message)
    }
}

// Logout the currently authenticated user
export async function logout() {
    try {
        // Send a logout request to the backend
        const response = await api.post("/api/auth/logout")

        // Return the response data received from the backend
        return response.data
    }
    catch (err) {
        console.log("Logout error:", err.response?.data || err.message)
    }
}

// Get information about the currently authenticated user
export async function getMe() {
    try {
        // Request the current user's information from the backend
        const response = await api.get("/api/auth/get-me")

        // Return the response data received from the backend
        return response.data
    }
    catch (err) {
        console.log("Get user error:", err.response?.data || err.message)
    }
}