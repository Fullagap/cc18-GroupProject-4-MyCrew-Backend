// routes/clockInOut-router.js
const express = require('express');
const router = express.Router();
const clockInOutController = require('../controllers/clockInOut');

router.post('/clock-in', clockInOutController.clockIn);
router.post('/clock-out', clockInOutController.clockOut);

module.exports = router;