const { getAttandanceRecordByUserId } = require("../repository/attandance-repo")
const createError = require("../utils/createError")
function actualWorkingDay(year,month,dayPerMonth)
{   
    let weekendDays = 0
    const firstDay = new Date(`${year}-${month}-01`).getDay()
    console.log("1st day",firstDay)
    for(let i=firstDay ; i<(firstDay + dayPerMonth) ; i++){
        if((i%7==0)||(i%7==6))
        {
            weekendDays = weekendDays+1
        }
    }
    
    return {weekendDays,workingDay:(dayPerMonth - weekendDays)}
    
}

exports.calculateSalary = async (req,res,next)=>{ 
    try {
        const {userId,month,year} = req.body
        const dayPerMonth = new Date(year,month,0).getDate()
        console.log("Day per month is : ", dayPerMonth)
        const monthlyDetail = actualWorkingDay(year,month,dayPerMonth)
        console.log("detail",monthlyDetail)
        const resp = await getAttandanceRecordByUserId(Number(userId),Number(month),Number(year))
        console.log(resp)
        res.status(200).json(resp)
    } catch (error) {
       next(error) 
    }
}