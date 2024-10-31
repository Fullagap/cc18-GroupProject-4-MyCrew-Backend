const { getRecordByUserId } = require("../repository/leaverecord-repo")
const { getUserById } = require("../repository/user-repo")
const createError = require("../utils/createError")

exports.GetUser = async (req,res,next)=>{
    try {
        const {id} = req.params
        console.log(id)
        const user = await getUserById(Number(id))
        if(!user){
            createError(500,"user is invalid")
        }
        console.log("user is " ,user)
        res.status(200).json(user)
    } catch (error) {
       next(error) 
    }
}

exports.GetLeave = async (req,res,next)=>{
    try {
        const {id} = req.params
        console.log(id)
        const user = await getUserById(Number(id))
        if(!user){
            createError(500,"user is invalid")
        }
        const leave = {
            AL : user.annualLeaveAmount,
            SL : user.sickLeaveAmount,
            WOP : user.WOPayAmount,
        }
        console.log("leave amout is " ,leave)
        res.status(200).json(leave)
    } catch (error) {
       next(error) 
    }
}

exports.GetSalary = async (req,res,next)=>{
    try {
        const {id} = req.params
        console.log(id)
        const user = await getUserById(Number(id))
        if(!user){
            createError(500,"user is invalid")
        }
        const salary = user.salary
        console.log(salary)
        console.log("salary amout is " ,salary)
        res.status(200).json({salary})
    } catch (error) {
       next(error) 
    }
}

exports.GetLeaveRecord = async (req,res,next)=>{
    try {
        const {id} = req.params
        console.log(id)
        const rec = await getRecordByUserId(Number(id))
        if(!rec){
            createError(500,"record is not valid")
        }
        console.log(rec)
        
        res.status(200).json(rec)
    } catch (error) {
       next(error) 
    }
}