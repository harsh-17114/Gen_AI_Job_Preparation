const pdfParse = require("pdf-parse")
const { generateInterviewReport } = require("../services/ai.service.js")
const interviewReportModel = require("../models/interviewReport.model.js")

// Controller to generate an interview report
async function generateInterviewReportController(req, res) {
    const { selfDescription, jobDescription } = req.body
    try {
        // Extract text content from the uploaded resume PDF
        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

        // Send the resume, self-description, and job description to the AI Service
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        // Save the generated interview report in MongoDB
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAi
        })

        // Send the generated interview report
        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    }
    catch (err) {
        console.error("Error generating interview report:", err)

        // Return a server error response
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Controller to fetch a specific interview report by its ID
async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params
    try {
        // Find the report using both the report ID
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        // If no report exist, return an error
        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        // Send the interview report
        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    }
    catch (err) {
        console.error("Error retrieving interview report:", err)

        // Return a server error response
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

// Controller to fetch all interview reports belonging to the logged-in user
async function getAllInterviewReportsController(req, res) {
    try {
        // Find all reports created by the current user
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        // Send the list of interview reports
        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    }
    catch (err) {
        console.error("Error retrieving interview reports:", err)

        // Return a server error response
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }