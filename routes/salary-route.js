const express = require("express")
const { calculateSalary} = require("../controllers/salary-controller")
const router = express.Router()

router.post("/salary", calculateSalary)
// router.get("/salary/user",getLeaveRecord)

module.exports = router