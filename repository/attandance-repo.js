const { Prisma } = require("@prisma/client")
const prisma = require("../config/prisma")

exports.getWorkingRecordByUserId = async(userId,month,year)=>{
    try {
        const data = {where:{userId,month,year,isWorkingDay:true}}
        const resp = await prisma.attendance.findMany(data)
        return resp
    } catch (error) {
        console.log(error)     
    }
    
}