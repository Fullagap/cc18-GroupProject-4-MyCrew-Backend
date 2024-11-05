const express = require("express")
const { GetUser, GetLeave, GetSalary, GetLeaveRecord } = require("../controllers/user-controller")
const router = express.Router()

router.get("/user/:id", GetUser)
router.get("/user/leave/:id", GetLeave)
router.get("/user/salary/:id", GetSalary)
router.get("/user/leave-record/:id", GetLeaveRecord)

module.exports = router