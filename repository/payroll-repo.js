const { Prisma } = require("@prisma/client")
const prisma = require("../config/prisma")

exports.getIncomePerDayByUserId = async(id,month,year)=>{
    try {
        const resp = await prisma.payroll.findFirst({where : {userId:id,month,year}, select: {incomePerDay : true}})
        return resp
    } catch (error) {
        console.log(error)     
    }
}

exports.createPayroll = async(userId, month, year, objPayroll)=>{
    try {
        const {netIncome, income, salary,compensation,tax,socialSecurityFund,providentFund,extra,incomePerDay} = objPayroll
        const resp = await prisma.payroll.create({data : {userId,month,year,netIncome, income, salary,compensation,tax,socialSecurityFund,providentFund,extra,incomePerDay} })
        return resp
    } catch (error) {
        console.log(error)     
    }
}

exports.getAllPayrollByUserId = async(userId)=>{
    try {
        
        const resp = await prisma.payroll.findMany({where:{userId}})
        return resp
    } catch (error) {
        console.log(error)     
    }
}
exports.getPayroll = async(userId,month,year)=>{
    try {
        const resp = await prisma.payroll.findFirst({
            where : {userId,month,year},
            include : {user : true}
          })
        return resp
    } catch (error) {
        console.log(error)     
    }
}