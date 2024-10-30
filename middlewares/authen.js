const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")
const prisma = require("../config/prisma") 

module.exports.authCheck  = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1] ;
        if(!token){
            return createError(401,"Unauthorized")
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY)

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })
        if(!user){
            return createError(401,"Unauthorized")
        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

module.exports.adminCheck = async (req,res,next)=>{
    try {
        const {email} = req.user
        const adminUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(adminUser.role !== "admin"){
            return createError(401,"Unauthorized")
        }
        next()
    } catch (error) {
        next(error)
    }
}