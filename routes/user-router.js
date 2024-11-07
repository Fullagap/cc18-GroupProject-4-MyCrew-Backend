const express = require("express")
const { GetUser, GetLeave, GetSalary, GetLeaveRecord} = require("../controllers/user-controller")
const {getSiteLocationData } = require("../controllers/user-location-controller")
const router = express.Router()

router.get('/user/getsitelocation',getSiteLocationData)
router.get("/user/:userid", GetUser)
router.get("/user/leave/:userid", GetLeave)
router.get("/user/salary/:userid", GetSalary)
router.get("/user/leave-record/:userid", GetLeaveRecord)

module.exports = router