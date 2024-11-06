const { Prisma } = require("@prisma/client")
const prisma = require("../config/prisma")

exports.getAttandanceRecordByUserId = async(userId,month,year)=>{
    try {
        const data = {where:{userId,month,year}}
        const resp = await prisma.attendance.findMany(data)
        console.log(resp)
        return resp
    } catch (error) {
        console.log(error)     
    }
    
}