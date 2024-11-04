const express = require("express")
const router = express.Router()
<<<<<<< HEAD
const {login,changePassword,requestChangePassword} = require("../controllers/auth-controller")

=======
const {login,changePassword, requestChangePassword} = require("../controllers/auth-controller")
>>>>>>> dev


router.post("/auth/login",login)
router.patch("/auth/request-change-password",requestChangePassword)
router.patch("/auth/change-password",changePassword)
<<<<<<< HEAD

=======
>>>>>>> dev


module.exports = router
