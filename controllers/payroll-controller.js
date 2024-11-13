const { getPayrollData, getAllPayrollData, submitPayrollData } = require('../service/payroll-service');

const fetchPayroll = async (req, res) => {
    let { userId, month, year } = req.query;

    userId = userId?  parseInt(userId, 10): null;
    month = parseInt(month, 10);
    year = parseInt(year, 10);

    if (isNaN(userId) || isNaN(month) || isNaN(year)) {
      return res.status(400).json({ error: "Invalid parameters, userId, month, and year should be numbers." });
    }

    try {
      const payrollData = await getPayrollData(userId, month, year);
      console.log(payrollData);
      res.status(200).json(payrollData);
    } catch (error) {
      console.error("Error fetching payroll data:", error);
      res.status(500).json({ error: "Error fetching payroll data" });
    }
};

// New controller function for fetching all payroll data
const fetchAllPayroll = async (req, res) => {
    try {
      const payrollData = await getAllPayrollData();
      res.status(200).json(payrollData);
    } catch (error) {
      console.error("Error fetching all payroll data:", error);
      res.status(500).json({ error: "Error fetching all payroll data" });
    }
};

const handleSubmitPayroll = async (req, res) => {
    const { userId, paidAmount, paidDate, month, year, income, salary } = req.body;

    // ตรวจสอบว่า income ได้รับค่าหรือไม่
    if (income === undefined || income === null) {
      return res.status(400).json({ error: "Income is required" });
    }

    try {
      // แปลง income และ salary เป็น Decimal
      const result = await submitPayrollData({
        userId,
        paidDate,
        paidAmount,
        month,
        year,
        income: parseFloat(income),  // แปลง income ให้เป็น number ก่อนส่งไปยัง Prisma
        salary: parseFloat(salary),  // แปลง salary ให้เป็น number ก่อนส่งไปยัง Prisma
      });
      res.status(200).json({ message: "Payroll data submitted successfully", result });
    } catch (error) {
      console.error("Error submitting payroll data:", error);
      res.status(500).json({ error: "Error submitting payroll data" });
    }
};

module.exports = { fetchPayroll, fetchAllPayroll, handleSubmitPayroll };
