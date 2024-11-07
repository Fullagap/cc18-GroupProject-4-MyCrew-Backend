const {getWorkingRecordByUserId } = require("../repository/attandance-repo")
const { getSalaryByUserId } = require("../repository/user-repo")
const createError = require("../utils/createError")
function getWorkingDetailByMonthly(year,month)
{   
    // Get days in one month
    const dayPerMonth = new Date(year,month,0).getDate()
    // console.log("Day per month is : ", dayPerMonth) 

    let weekendDays = 0
    const firstDay = new Date(`${year}-${month}-01`).getDay()
    console.log("1st day",firstDay)
    for(let i=firstDay ; i<(firstDay + dayPerMonth) ; i++){
        if((i%7==0)||(i%7==6))
        {
            weekendDays = weekendDays+1
        }
    }
    return {weekendDays,workingDay:(dayPerMonth - weekendDays),dayPerMonth}
}

function calculateSocialSecurityFund(salary)
{
    const amount = salary*0.05
    return amount>=750?750:amount
}
function calculateProvidentFund(amount)
{
    return amount*0.03
}
function getTax(income,providentFund,socialSecurityFund)
{   
    let tax = 0.05
    return ((income-providentFund-socialSecurityFund)*tax)
}
function calculatePayroll (WorkingDetail,ActualWorkingDay,Salary){
    const workingDay = Number(WorkingDetail.workingDay)
    const actualWorkingDay = Number(ActualWorkingDay)
    const salary = Number(Salary)
    console.log(workingDay,actualWorkingDay,salary)
    let payroll = {}
    let paidPerDay = (salary/workingDay)
    let compensation = paidPerDay*(workingDay-actualWorkingDay)
    let income = salary-compensation
    //Provident fund 3%
    let providentFund = calculateProvidentFund(income)
    let socialSecurityFund = calculateSocialSecurityFund(salary)
    let tax = getTax(income,providentFund,socialSecurityFund)
    let netIncome = income-providentFund-socialSecurityFund-tax
    payroll ={compensation,salary,tax,socialSecurityFund,providentFund,netIncome,income}
    return payroll
}

exports.calculateSalary = async (req,res,next)=>{ 
    try {
        const {userId,month,year} = req.body
        //Get number of workingday,WeekendDay
        const workingDetail = getWorkingDetailByMonthly(year,month)
        const resp = await getWorkingRecordByUserId(Number(userId),Number(month),Number(year))
        console.log("actual WorkingDay",resp.length)
        const actualWorkingDay = resp.length
        const getUserSalary = await getSalaryByUserId(Number(userId))
        const salary = getUserSalary.salary
        const payroll = calculatePayroll(workingDetail,actualWorkingDay,salary)
        console.log(payroll)
        res.status(200).json(payroll)
    } catch (error) {
       next(error) 
    }
}