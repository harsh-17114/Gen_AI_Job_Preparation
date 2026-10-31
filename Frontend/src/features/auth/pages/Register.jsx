import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Register = () => {
    const navigate = useNavigate()

    // State for storing the username entered by the user
    const [username, setUsername] = useState("")

    // State for storing the email entered by the user
    const [email, setEmail] = useState("")

    // State for storing the password entered by the user
    const [password, setPassword] = useState("")

    // Get authentication loading state and registration function
    const { loading, handleRegister } = useAuth()

    // Handle registration form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const success = await handleRegister({ username, email, password })
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

    // Render the registration form
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>

                    {/* Username input section */}
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name="username" placeholder="Enter username" />
                    </div>

                    {/* Email input section */}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name="email" placeholder="Enter email address" />
                    </div>

                    {/* Password input section */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name="password" placeholder="Enter password" />
                    </div>

                    {/* Submit button for the registration form */}
                    <button className="button primary-button">Register</button>
                </form>

                {/* Link to the login page */}
                <p>Already have an account? <Link to={'/login'}>Login</Link> </p>
            </div>
        </main>
    )
}

export default Register