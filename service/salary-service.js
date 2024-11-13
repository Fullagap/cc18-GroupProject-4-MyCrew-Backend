const { getWorkingRecordByUserId } = require("../repository/attandance-repo")
const { getMonthlyLeaveRecordByUserId, getPrevMonthlyLeaveRecordByUserId, updateLeaveRecordsById } = require("../repository/leaverecord-repo")
const { getIncomePerDayByUserId } = require("../repository/payroll-repo")
const { getPublicHolidayByMonthly } = require("../repository/publicHoliday-repo")
const { getSalaryByUserId, getUsersId } = require("../repository/user-repo")

function zeroPad(num, places) 
{
    const output = String(num).padStart(places, '0')
    return output
}

function getAmountOfDay(month,year)
{
    // console.log(month,year)
    const dayPerMonth = new Date(year,month,0).getDate()
    // console.log("daypermonth",dayPerMonth)
    return dayPerMonth
}

function getWorkingDetailByMonthly(month,year)
{   
    // Get days in one month
    const dayPerMonth = getAmountOfDay(month,year)
    // console.log("Day per month is : ", dayPerMonth) 

    let weekendDays = 0
    const firstDay = new Date(`${year}-${month}-01`).getDay()
    // console.log("1st day",firstDay)
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

async function calculatePayroll (objWorkingDetail,ActualWorkingDay,userId,month,year)
{
    const workingDay = Number(objWorkingDetail.workingDay)
    const actualWorkingDay = Number(ActualWorkingDay)
    
    //getUserSalary
    const userSalary = await getSalaryByUserId(Number(userId))
    const salary = userSalary.salary
    
    //getUserLeave data
    const leaveData = await getLeaveDataByMonthly(Number(userId),Number(month),Number(year))
    console.log(leaveData)

    //get holiday data
    const holiday = await getPublicHolidayByMonthly(Number(month),Number(year))
    const holidayAmount = holiday.length ??0
    console.log("holiday",holidayAmount)

    const lastMonthData = (month === 1)?await getIncomePerDayByUserId(Number(userId),Number(12),Number(year-1)):await getIncomePerDayByUserId(Number(userId),Number(month-1),Number(year))
    const prevIncomePerDay = lastMonthData?.incomePerDay || 0
    // console.log('prevIncomePerDay', prevIncomePerDay)

    let payroll = {}
    let incomePerDay = (salary/workingDay)
    let compensation = incomePerDay*(workingDay-actualWorkingDay-leaveData.currentLeave-holidayAmount)
    let extra = leaveData.previousLeave*prevIncomePerDay
    let income = salary-compensation + extra
    //Provident fund 3%
    let providentFund = calculateProvidentFund(income)
    let socialSecurityFund = calculateSocialSecurityFund(salary)
    let tax = getTax(income,providentFund,socialSecurityFund)
    let netIncome = income-providentFund-socialSecurityFund-tax
    payroll ={incomePerDay,compensation,salary,tax,socialSecurityFund,providentFund,netIncome,income,extra}
    return payroll
}

async function getWorkingRecord(userId,month,year)
{
    const resp = await getWorkingRecordByUserId(Number(userId),Number(month),Number(year))
    const record = resp.reduce((prev,curr,index)=>{
        let duration = (curr.checkOutTime.getTime()-curr.checkInTime.getTime()) //base on millisec
        let workingTime = 0
        const stdWorktime = 9*60*60*1000 //9 hours perday
        if(duration > stdWorktime)
        {
            workingTime = 1
        }
        else{
            workingTime = Math.floor((duration/stdWorktime)*100)/100
        }
        prev = prev+workingTime
        return prev
    },0)
    return record
}

async function getLeaveDataByMonthly(userId,month,year,optional)
{
    // const lowerLimit = new Date(`${year}-${month}-01`)
    // const upperLimit = new Date(`${year}-${month}-${getAmountOfDay(month,year)}`)
    const lowerLimit = `${year}-${month}-01`
    const upperLimit = `${year}-${month}-${getAmountOfDay(month,year)}`
    
    //get leave record on this month
    const result = await getMonthlyLeaveRecordByUserId(userId,lowerLimit,upperLimit)
    // console.log("leave duration", result)
    const currentLeave = getDuration(result,month,year)
    console.log("currentLeave",currentLeave)

    //get leave record on previous month
    const lowerLimitPrev = (month ===1)?`${year-1}-${12}-01`:`${year}-${month-1}-${getAmountOfDay(month,year)}`
    const upperLimitPrev = (month ===1)?`${year-1}-${12}-${getAmountOfDay(month,year)}`:`${year}-${month-1}-${getAmountOfDay(month,year)}`

    const resultPrev = await getPrevMonthlyLeaveRecordByUserId(userId,lowerLimitPrev,upperLimitPrev)
    // console.log("leave duration", resultPrevious)
    const previousLeave = (month === 1)?getDuration(resultPrev,12,year-1):getDuration(resultPrev,month-1,year)
    console.log("previousLeave",previousLeave)
    let output = {currentLeave,previousLeave}
    updateRecord(result,resultPrev)
    return output
}

function getDuration(arrObj,month,year)
{
    // console.log("arrObj",arrObj)
    const result = arrObj.reduce((prev,curr,index)=>{
        // console.log("curr",curr)
        let startDate = curr.startDate
        let endDate = curr.endDate
        const startMonth = curr.startDate.getMonth() +1
        const endMonth = curr.endDate.getMonth() +1
        if(startMonth !== endMonth)
        {
            // console.log(getAmountOfDay(month,year))
            // console.log('startMonth', startMonth)
            // console.log('endMonth', endMonth)
            if(startMonth < month)
            {
                startDate = new Date(`${year}-${month}-01`) 
            }else if(endMonth > month){
               
                endDate = new Date(`${year}-${zeroPad(month,2)}-${getAmountOfDay(month,year)}`)
                // endDate = new Date(`2024-09-30`)  
            }
        }
        // console.log('startDate', startDate)
        // console.log('endDate', endDate)
        let duration = calDuration(startDate,endDate)
        prev += duration
        return prev
    },0)

    return result
}

function calDuration(startDate,endDate)
{
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    // console.log(diffDays + " days");
    return diffDays
}

function updateRecord(result,prevResult)
{
    let arrData =[]
    result.map((el)=>{
        arrData.push(el.id)
    })
    prevResult.map(el=>arrData.push(el.id))
    console.log("arrData",arrData)
    updateLeaveRecordsById(arrData)
}

async function getAllUserId()
{
    const arrUsers = []
    const users = await getUsersId()
    users.map((el)=>arrUsers.push(el.id))
    console.log(arrUsers)
    return arrUsers
}

module.exports = {getWorkingDetailByMonthly,calculatePayroll,getLeaveDataByMonthly,getAllUserId,getWorkingRecord}