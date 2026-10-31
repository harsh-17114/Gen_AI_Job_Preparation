import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
    const navigate = useNavigate()

    // Get authentication loading state and login function
    const { loading, handleLogin } = useAuth()

    // State for storing the email entered by the user
    const [email, setEmail] = useState("")

    // State for storing the password entered by the user
    const [password, setPassword] = useState("")

    // Handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleLogin({ email, password })
        if (success) {
            navigate('/')
        }
    }

    // Display a loading message while authentication is being processed
    if (loading) {
        return (
            <main>
                <h1>Loading.......</h1>
            </main>
        )
    }

    // Render the login form
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>

                    {/* Email input section */}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder="Enter email address" />
                    </div>

                    {/* Password input section */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name="password" placeholder="Enter password" />
                    </div>

                    {/* Submit button for the login form */}
                    <button className="button primary-button">Login</button>
                </form>

                {/* Link to the registration page */}
                <p>Don't have an account? <Link to={'/register'}>Register</Link> </p>
            </div>
        </main>
    )
}

export default Login