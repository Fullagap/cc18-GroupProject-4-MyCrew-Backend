const express = require("express")
const { GetUser, GetLeave, GetSalary, GetLeaveRecord, GetAllPayRecByUser, getLastPayroll, } = require("../controllers/user-controller")
const {getSiteLocationData } = require("../controllers/user-location-controller")
const router = express.Router()

router.get('/user/getsitelocation',getSiteLocationData)
router.get("/user/:userid", GetUser)
router.get("/user/leave/:userid", GetLeave)
router.post("/user/payroll/:userid", getLastPayroll)
router.get("/user/salary/:userid", GetSalary)
router.get("/user/salaries/:userid", GetAllPayRecByUser)
router.get("/user/leave-record/:userid", GetLeaveRecord)


module.exports = router