const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")
const prisma = require("../config/prisma") 

exports.authCheck = async (req,res,next) => {
    try {
    
      const authorization = req.headers.authorization
        if(!authorization || !authorization.startsWith("Bearer") ){
            createError(401,"Unauthorized1")
        }
        const token  =authorization.split(" ")[1]

        if(!token) {
            createError(401,"Unauthorized")
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log("playyyyyyyyy",payload.user.id)

        const foundUser = await prisma.user.findUnique({
            where : {
                id : payload.user.id
            }
        })
        console.log("USERRRR",foundUser)

        if (!foundUser) {
            createError(401,"Unauthorized")
        }
        console.log(foundUser)

        const {password ,identityCardNumber,dateStart , dateEnd, ...useData} = foundUser
        req.user = useData
        console.log("userrrrrr",req.user)

        next()
  } catch (err) {
      next(err)
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
        // console.log(adminUser)
        if(adminUser.role !== "ADMIN"){
            return createError(401,"Unauthorized")
        }
        next()
    } catch (error) {
        next(error)
    }
}