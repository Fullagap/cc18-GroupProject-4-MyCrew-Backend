// routes/clockInOut-router.js
const express = require('express');
const router = express.Router();
const clockInOutController = require('../controllers/clockInOut');
const { authCheck} = require("../middlewares/authen");

router.post('/clock-in',authCheck,clockInOutController.clockIn);
router.post('/clock-out',authCheck, clockInOutController.clockOut);
router.get('/get-attendance-data',authCheck,clockInOutController.getAttendanceData)


module.exports = router;