const express = require('express');
const { fetchPayroll, fetchAllPayroll, handleSubmitPayroll } = require("../controllers/payroll-controller");

const router = express.Router();

router.get('/payroll', fetchPayroll);  
router.get('/payroll/all', fetchAllPayroll);  
// router.post('/payroll/submit', handleSubmitPayroll); 

module.exports = router;
