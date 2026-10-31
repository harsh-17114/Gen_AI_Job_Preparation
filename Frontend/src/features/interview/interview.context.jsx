import { createContext, useState } from "react"

export const InterviewContext = createContext()

// InterviewProvider provides interview-related state to all child components
export const InterviewProvider = ({ children }) => {
    // Tracks whether an interview-related API operation is in progress
    const [loading, setLoading] = useState(false)

    // Stores the currently selected/generated interview report
    const [report, setReport] = useState(null)

    // Stores all interview reports belonging to the user
    const [reports, setReports] = useState([])

    return (
        // Provide interview state and setter functions to all components inside InterviewProvider
        <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports }}>
            {children}
        </InterviewContext.Provider>
    )
}