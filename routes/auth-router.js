const express = require("express")
const router = express.Router()
<<<<<<< HEAD
const {login,changePassword, requestChangePassword, resetPassword} = require("../controllers/auth-controller")
=======
const {login,changePassword,requestChangePassword} = require("../controllers/auth-controller")

>>>>>>> dev


router.post("/auth/login",login)
router.patch("/auth/request-change-password",requestChangePassword)
router.patch("/auth/change-password",changePassword)
<<<<<<< HEAD
router.post("auth/reset-password",resetPassword)
// router.patch("/auth/update-profile",updateProfile)
=======
>>>>>>> dev


module.exports = router
