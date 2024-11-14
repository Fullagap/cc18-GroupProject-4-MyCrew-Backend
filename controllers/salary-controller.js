const {getWorkingRecordByUserId } = require("../repository/attandance-repo")
const { getSalaryByUserId } = require("../repository/user-repo")
const createError = require("../utils/createError")
const {getWorkingDetailByMonthly,calculatePayroll, getLeaveDataByMonthly, getAllUserId, getWorkingRecord} = require("../service/salary-service")
const { getMonthlyLeaveRecordByUserId } = require("../repository/leaverecord-repo")
const { payroll } = require("../config/prisma")
const { createPayroll } = require("../repository/payroll-repo")

exports.calculateSalary = async (req,res,next)=>{ 
    try {
        const {month,year} = req.body
        console.log('ข้อมูลที่ได้รับใน body:', req.body);
        //Get number of workingday,WeekendDay
        const users = await getAllUserId()
        for(let i=0;i<users.length;i++)
        {
            let userId = users[i]
            const workingDetail = getWorkingDetailByMonthly(month,year)
            // const resp = await getWorkingRecordByUserId(Number(userId),Number(month),Number(year))
            // console.log("resp",await getWorkingRecord(Number(userId),Number(month),Number(year)))
            // console.log("actual WorkingDay",resp.length)
            const actualWorkingDay = await getWorkingRecord(Number(userId),Number(month),Number(year))
            console.log('actualWorkingDay', actualWorkingDay)
            const payroll = await calculatePayroll(workingDetail,actualWorkingDay,userId,month,year)
            console.log("payroll",payroll)
            await createPayroll(userId,Number(month),Number(year),payroll)
            
        }
        res.status(200).json({msg:"success create payroll"})
    } catch (error) {
       next(error) 
    }
}