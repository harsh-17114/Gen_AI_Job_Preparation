const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const router = express.Router()

// Generate Interview Report
// POST /api/interview/
router.post("/", authMiddleware.authMiddleware, upload.single("resume"), interviewController.generateInterviewReportController)

// Get Interview Report by ID
// GET /api/interview/report/:interviewId
router.get("/report/:interviewId", authMiddleware.authMiddleware, interviewController.getInterviewReportByIdController)

// Get All Interview Reports
// GET /api/interview/
router.get("/", authMiddleware.authMiddleware, interviewController.getAllInterviewReportsController)

module.exports = router