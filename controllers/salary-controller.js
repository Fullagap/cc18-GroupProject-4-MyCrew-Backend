const {getWorkingRecordByUserId } = require("../repository/attandance-repo")
const { getSalaryByUserId } = require("../repository/user-repo")
const createError = require("../utils/createError")
const {getWorkingDetailByMonthly,calculatePayroll, getLeaveDataByMonthly} = require("../service/salary-service")
const { getMonthlyLeaveRecordByUserId } = require("../repository/leaverecord-repo")

exports.calculateSalary = async (req,res,next)=>{ 
    try {
        const {userId,month,year} = req.body
        //Get number of workingday,WeekendDay
        const workingDetail = getWorkingDetailByMonthly(month,year)
        const resp = await getWorkingRecordByUserId(Number(userId),Number(month),Number(year))
        console.log("actual WorkingDay",resp.length)
        const actualWorkingDay = resp.length
        const getUserSalary = await getSalaryByUserId(Number(userId))
        const salary = getUserSalary.salary
        const leaveData = await getLeaveDataByMonthly(Number(userId),Number(month),Number(year))
        // console.log("leaveRecord",leaveData)
        const payroll = calculatePayroll(workingDetail,actualWorkingDay,salary)
        console.log(payroll)
        res.status(200).json(payroll)
    } catch (error) {
       next(error) 
    }
}