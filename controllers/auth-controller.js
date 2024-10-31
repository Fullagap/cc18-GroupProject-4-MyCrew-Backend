const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


exports.login = async(req,res,next)=>{
    try {

        const {email,password} = req.body
      
        const user = await prisma.user.findUnique({
           where:{
               email: email
           }
        })
        
        if(!user){
           return createError(400,"Email or password is invalid")
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
           return createError(400,"Password is not match!!")
        }
        const payload ={
           user:{
               id: user.id,
               email: user.email,
               role: user.role
           }
        }

        //Generate token
        const genToken = jwt.sign(payload,process.env.JWT_SECRET,{
           expiresIn: "30d"
        })
        
        res.json({
            user: payload.user,
            token: genToken
           })
    } catch (err) {
        next(err)
    }
}

exports.changePassword = async(req,res,next)=>{
    try {
        res.json('Change password')
    } catch (err) {
        next(err)
    }
}


