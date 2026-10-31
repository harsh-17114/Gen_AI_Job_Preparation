import axios from "axios"

// Create a reusable Axios instance
const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

// Generate a new interview report
export const generateInterviewReport = async ({ jobDescription, selfDescription, resume }) => {
    // Create FormData
    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resume)

    // Send the interview report request to the backend
    const response = await api.post("/api/interview/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    // Return the response data received from the backend
    return response.data
}

// Get a specific interview report using its ID
export const getInterviewReportById = async (interviewId) => {
    // Send a GET request to fetch the requested interview report
    const response = await api.get(`/api/interview/report/${interviewId}`)

    // Return the response data received from the backend
    return response.data
}

// Get all interview reports belonging to the current user
export const getAllInterviewReports = async () => {
    // Send a GET request to fetch all interview reports
    const response = await api.get("/api/interview/")

    // Return the response data received from the backend
    return response.data
}