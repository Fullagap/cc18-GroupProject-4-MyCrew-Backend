const { getMonthlyLeaveRecordByUserId } = require("../repository/leaverecord-repo")

function getAmountOfDay(month,year)
{
    const dayPerMonth = new Date(year,month,0).getDate()
    return dayPerMonth
}

function getWorkingDetailByMonthly(month,year)
{   
    // Get days in one month
    const dayPerMonth = getAmountOfDay(month,year)
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
    let incomePerDay = (salary/workingDay)
    let compensation = incomePerDay*(workingDay-actualWorkingDay)
    let income = salary-compensation
    //Provident fund 3%
    let providentFund = calculateProvidentFund(income)
    let socialSecurityFund = calculateSocialSecurityFund(salary)
    let tax = getTax(income,providentFund,socialSecurityFund)
    let netIncome = income-providentFund-socialSecurityFund-tax
    payroll ={incomePerDay,compensation,salary,tax,socialSecurityFund,providentFund,netIncome,income}
    return payroll
}

async function getLeaveDataByMonthly(userId,month,year,optional)
{
    // const lowerLimit = new Date(`${year}-${month}-01`)
    // const upperLimit = new Date(`${year}-${month}-${getAmountOfDay(month,year)}`)
    const lowerLimit = `${year}-${month}-01`
    const upperLimit = `${year}-${month}-${getAmountOfDay(month,year)}`
    console.log("amount of day",upperLimit,lowerLimit)
    const result = await getMonthlyLeaveRecordByUserId(userId,lowerLimit,upperLimit)
    console.log("leave duration", result)
    const leaveDate = getDuration(result,month,year)
    console.log(leaveDate)
    return result
}

function getDuration(arrObj,month,year)
{
    console.log("arrObj",arrObj)
    const result = arrObj.reduce((prev,curr,index)=>{
        // console.log("curr",curr)
        let startDate = curr.startDate
        let endDate = curr.endDate
        const startMonth = curr.startDate.getMonth()
        const endMonth = curr.endDate.getMonth()
        if(startMonth !== endMonth)
        {
            console.log('startMonth', startMonth)
            console.log('endMonth', endMonth)
            if(index === 0)
            {
                startDate = new Date(`${year}-${month}-01`) 
            }else{
                endDate = new Date(`${year}-${month}-${getAmountOfDay(month,year)}`) 
            }
        }
        console.log('startDate', startDate)
        console.log('endDate', endDate)
        let duration = calDuration(startDate,endDate)
        prev += duration
        return prev
    },0)
    console.log('result', result)
    return result
}

function calDuration(startDate,endDate)
{
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    console.log(diffDays + " days");
    return diffDays
}

module.exports = {getWorkingDetailByMonthly,calculatePayroll,getLeaveDataByMonthly}