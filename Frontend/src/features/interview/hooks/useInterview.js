import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router-dom"

// Custom hook for handling interview-related operations
export const useInterview = () => {
    // Get the interview context
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    // Make sure this hook is being used inside InterviewProvider
    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    // Extract interview state and setter functions from the context
    const { loading, setLoading, report, setReport, reports, setReports } = context

    // Generate a new interview report
    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try {
            // Send candidate information and resume to the backend
            response = await generateInterviewReport({ jobDescription, selfDescription, resume: resumeFile })

            // Store the generated interview report in the context
            setReport(response.interviewReport)
        }
        catch (err) {
            console.log("Generate report error:", err)
            throw err
        }
        finally {
            setLoading(false)
        }

        // Return the generated interview report
        return response?.interviewReport
    }

    // Fetch a specific interview report by its ID
    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            // Request the interview report from the backend
            response = await getInterviewReportById(interviewId)

            // Store the fetched report in the context
            setReport(response.interviewReport)
        }
        catch (err) {
            console.log("Get report error:", err)
            throw err
        }
        finally {
            setLoading(false)
        }

        // Return the fetched interview report
        return response?.interviewReport
    }

    // Fetch all interview reports for the current user
    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            // Request all interview reports from the backend
            response = await getAllInterviewReports()

            // Store all reports in the context
            setReports(response.interviewReports)
        }
        catch (err) {
            console.log("Get reports error:", err)
            throw err
        }
        finally {
            setLoading(false)
        }

        // Return the list of interview reports
        return response?.interviewReports
    }

    // Run when the interviewId changes or when the component using this hook is mounted
    useEffect(() => {
        // If an interviewId exists in the URL then fetch that specific interview report
        if (interviewId) {
            getReportById(interviewId)
        }

        // Otherwise, fetch all interview reports
        else {
            getReports()
        }
    }, [interviewId])

    return { loading, report, reports, generateReport, getReportById, getReports }
}