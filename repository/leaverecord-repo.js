const { Prisma } = require("@prisma/client")
const prisma = require("../config/prisma")

exports.getRecordByUserId = async(id)=>{
    try {
        const data = {where : {userId:id}}
        const resp = await prisma.leaveRecord.findMany(data)
        return resp
    } catch (error) {
        console.log(error)     
    }
    
}