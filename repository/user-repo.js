const { Prisma } = require("@prisma/client")
const prisma = require("../config/prisma")

exports.getUserById = async(id)=>{
    try {
        const data = {where : {id:id}}
        const resp = await prisma.user.findFirst(data)
        return resp
    } catch (error) {
        console.log(error)     
    }
    
}