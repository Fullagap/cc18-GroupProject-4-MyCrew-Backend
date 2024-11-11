const { Prisma } = require("@prisma/client")
const prisma = require("../config/prisma")

exports.getRecordByUserId = async(id)=>{
    try {
        const data = {where : {userId:id}, include : {leaveCategory : true}}
        const resp = await prisma.leaveRecord.findMany(data)
        return resp
    } catch (error) {
        console.log(error)     
    }
    
}
exports.getMonthlyLeaveRecordByUserId = async(id,lowerLimit,upperLimit)=>{
    try {
        console.log(id,lowerLimit,upperLimit)
        const data = {
            where : { AND :[{userId:id}, {isPaid : false}, {status : "APPROVE"},{endDate : {gte : new Date(lowerLimit)}},{startDate: {lte:new Date(upperLimit)}}]},
            orderBy : {endDate : "asc"}
        }
        const resp = await prisma.leaveRecord.findMany(data)
        return resp
        
    } catch (error) {
        console.log(error)     
    }
    
}