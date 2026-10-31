const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router()

// Register a new user
// POST /api/auth/register
router.post("/register", authController.userRegisterController)

// Login an existing user
// POST /api/auth/login
router.post("/login", authController.userLoginController)

// Logout the currently logged-in user
// POST /api/auth/logout
router.post("/logout", authController.userLogoutController)

// Get user details
// GET /api/auth/get-me
router.get("/get-me", authMiddleware.authMiddleware, authController.getMeController)

module.exports = router