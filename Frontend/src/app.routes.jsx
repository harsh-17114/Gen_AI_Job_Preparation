import { createBrowserRouter } from "react-router-dom"
import Login from "./features/auth/pages/Login.jsx"
import Register from "./features/auth/pages/Register.jsx"
import Protected from "./features/auth/components/Protected.jsx"
import Home from "./features/interview/pages/Home.jsx"
import Interview from "./features/interview/pages/Interview.jsx"

// Create the application's router
export const router = createBrowserRouter([
    // Login page
    {
        path: "/login",
        element: <Login />
    },

    // Registration page
    {
        path: "/register",
        element: <Register />
    },

    // Home page
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },

    // Interview page
    {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    }
])