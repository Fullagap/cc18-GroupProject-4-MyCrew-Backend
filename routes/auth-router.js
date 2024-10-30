const express = require("express")
const router = express.Router()
const {register,login,changePassword,updateProfile} = require("../controllers/auth-controller")


router.post("/auth/register",register)
router.post("/auth/login",login)
router.patch("/auth/change-password",changePassword)
router.patch("/auth/update-profile",updateProfile)


module.exports = router
