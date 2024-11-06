const { getAttandanceRecordByUserId } = require("../repository/attandance-repo")
const createError = require("../utils/createError")

exports.calculateSalary = async (req,res,next)=>{
    try {
        const {userId,month,year} = req.body
        console.log("salary-controller", userId,month,year)
        const resp = await getAttandanceRecordByUserId(Number(userId),Number(month),Number(year))
        res.status(200).json(resp)
    } catch (error) {
       next(error) 
    }
}