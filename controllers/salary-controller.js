const createError = require("../utils/createError")

exports.calculateSalary = async (req,res,next)=>{
    try {
        console.log("salary-controller")
        res.status(200).json(user)
    } catch (error) {
       next(error) 
    }
}