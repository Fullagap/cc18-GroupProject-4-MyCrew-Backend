const express = require("express")
const router = express.Router()
const {login,changePassword, requestChangePassword, resetPassword} = require("../controllers/auth-controller")
const { authCheck } = require("../middlewares/authen")


router.post("/auth/login",login)
router.patch("/auth/request-change-password",requestChangePassword)
router.patch("/auth/change-password",changePassword)
router.post("/auth/reset-password",authCheck,resetPassword)
// router.patch("/auth/update-profile",updateProfile)


module.exports = router
