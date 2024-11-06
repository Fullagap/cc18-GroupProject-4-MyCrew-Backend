const express = require("express")
const { calculateSalary} = require("../controllers/salary-controller")
const router = express.Router()

router.get("/salary", calculateSalary)

module.exports = router