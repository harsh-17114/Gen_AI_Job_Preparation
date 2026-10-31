import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from './features/interview/interview.context.jsx'

const App = () => {

  return (
    // AuthProvider provides authentication state to all components inside the application
    <AuthProvider>

      {/* InterviewProvider provides interview-related state to all components inside the application */}
      <InterviewProvider>

        {/* RouterProvider handles navigation and renders the appropriate page based on the URL */}
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App